from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from pydantic import BaseModel
import os
import logging
from app.services.verification.certificate import CertificateVerificationService
from typing import Dict, Any
import json
import base64

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Initialize verification services
certificate_verifier = CertificateVerificationService()

# Define request model
class DocumentVerificationRequest(BaseModel):
    document_type: str
    document_data: str
    user_id: str

app = FastAPI(
    title="AuthNexus Backend",
    description="Document verification and authentication system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return FileResponse("static/index.html")

@app.post("/api/verify-document")
async def verify_document(request: Request) -> Dict[str, Any]:
    try:
        # Parse the request body
        body = await request.json()
        logger.info(f"Received request body: {body}")
        
        # Extract required fields
        document_type = body.get("document_type")
        user_id = body.get("user_id")
        document_data = body.get("document_data")
        
        if not all([document_type, user_id, document_data]):
            raise HTTPException(
                status_code=400,
                detail="Missing required fields: document_type, user_id, or document_data"
            )
            
        logger.info(f"Processing document type: {document_type} for user: {user_id}")
        
        # Convert base64 string to bytes
        try:
            document_bytes = base64.b64decode(document_data)
            logger.info(f"Document data length: {len(document_bytes)} bytes")
        except Exception as e:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid base64 document data: {str(e)}"
            )
        
        # Select the appropriate verification service based on document type
        if document_type in ["certificate", "custom", "drivers_license", "passport", "id_card"]:
            verification_service = certificate_verifier  # Using certificate verifier for all types for now
        else:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported document type: {document_type}"
            )
        
        # Perform verification
        result = await verification_service.verify(
            document_data=document_data,
            document_type=document_type,
            user_id=user_id
        )
        
        # Log the verification result
        logger.info(f"Verification result: {result}")
        
        # Return response in the format expected by the frontend
        return {
            "success": True,
            "message": "Document verification completed",
            "verification_result": {
                "is_valid": result.get("is_valid", False),
                "confidence": result.get("confidence_score", 0.0),
                "details": result.get("details", {}),
                "errors": result.get("errors", [])
            }
        }
        
    except HTTPException as he:
        logger.error(f"HTTP error during verification: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Unexpected error during verification: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 