import os
import base64
import hashlib
import secrets
import requests
from fastapi import APIRouter, HTTPException, Request, Query
from fastapi.responses import RedirectResponse, JSONResponse
from urllib.parse import urlencode
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# In-memory store for PKCE (use Redis/database in production)
verifier_store = {}

def generate_code_verifier() -> str:
    return secrets.token_urlsafe(32)

def generate_code_challenge(verifier: str) -> str:
    sha256_hash = hashlib.sha256(verifier.encode()).digest()
    return base64.urlsafe_b64encode(sha256_hash).decode().rstrip('=')

@router.get("/login")
async def salesforce_login(request: Request):
    """Start OAuth flow with PKCE"""
    try:
        # Generate PKCE values
        code_verifier = generate_code_verifier()
        code_challenge = generate_code_challenge(code_verifier)
        
        # Store verifier (use session/Redis in production)
        verifier_store['verifier'] = code_verifier
        
        # Build OAuth URL
        params = {
            "response_type": "code",
            "client_id": os.getenv("SALESFORCE_CLIENT_ID"),
            "redirect_uri": os.getenv("SALESFORCE_CALLBACK_URL"),
            "code_challenge": code_challenge,
            "code_challenge_method": "S256",
            "state": secrets.token_urlsafe(16),
            "scope": "api refresh_token openid"
        }
        
        auth_url = f"{os.getenv('SALESFORCE_AUTH_URL')}/services/oauth2/authorize"
        full_url = f"{auth_url}?{urlencode(params)}"
        
        print("\n🔹 OAuth Flow Debug:")
        print(f"Code Verifier: {code_verifier}")
        print(f"Code Challenge: {code_challenge}")
        print(f"Callback URL: {os.getenv('SALESFORCE_CALLBACK_URL')}")
        print(f"Full URL: {full_url}\n")
        
        return RedirectResponse(url=full_url, status_code=302)
    
    except Exception as e:
        print(f"❌ Login Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/oauth/callback")
async def salesforce_callback(
    code: Optional[str] = None,
    state: Optional[str] = None,
    error: Optional[str] = None,
    error_description: Optional[str] = None
):
    """Handle OAuth callback with PKCE verification"""
    
    print("\n🔹 Callback Received:")
    print(f"Code: {code and '...' + code[-10:]}")
    print(f"State: {state}")
    print(f"Error: {error}")
    
    if error:
        return JSONResponse(
            status_code=400,
            content={"error": error, "description": error_description}
        )
    
    if not code:
        return JSONResponse(
            status_code=400,
            content={"error": "missing_code", "description": "No code received"}
        )
    
    try:
        code_verifier = verifier_store.get('verifier')
        if not code_verifier:
            return JSONResponse(
                status_code=400,
                content={"error": "invalid_verifier", "description": "PKCE verifier not found"}
            )
        
        # Exchange code for token
        token_data = {
            "grant_type": "authorization_code",
            "code": code,
            "client_id": os.getenv("SALESFORCE_CLIENT_ID"),
            "client_secret": os.getenv("SALESFORCE_CLIENT_SECRET"),
            "redirect_uri": os.getenv("SALESFORCE_CALLBACK_URL"),
            "code_verifier": code_verifier
        }
        
        print("\n🔹 Token Request:")
        print(f"URL: {os.getenv('SALESFORCE_TOKEN_URL')}")
        print("Data:", {k: v if k != 'code_verifier' else '...' for k, v in token_data.items()})
        
        response = requests.post(
            os.getenv("SALESFORCE_TOKEN_URL"),
            data=token_data,
            headers={"Accept": "application/json"}
        )
        
        print(f"\n🔹 Token Response: {response.status_code}")
        print(f"Response: {response.text[:100]}...")
        
        if response.status_code != 200:
            return JSONResponse(
                status_code=response.status_code,
                content={"error": "token_error", "description": response.text}
            )
            
        # Clean up verifier
        verifier_store.pop('verifier', None)
        
        return JSONResponse(content=response.json())
        
    except Exception as e:
        print(f"❌ Callback Error: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"error": "server_error", "description": str(e)}
        )