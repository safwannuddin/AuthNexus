from fastapi import APIRouter, UploadFile, File, HTTPException
from ..models.document import DocumentCreate, Document
from ..services.ai_verification import verify_document
from ..services.blockchain import store_on_blockchain
from supabase import create_client
from ..core.config import settings
import uuid

router = APIRouter(prefix="/documents", tags=["documents"])

# Initialize Supabase client
supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

@router.post("/verify", response_model=Document)
async def verify_document_endpoint(
    file: UploadFile = File(...),
    user_id: str = None,
    document_type: str = None
):
    try:
        # Read file content
        contents = await file.read()
        
        # Verify document using AI
        verification_result = await verify_document(contents)
        
        # Create document record
        document_data = DocumentCreate(
            user_id=user_id,
            document_type=document_type,
            status="verified" if verification_result["is_valid"] else "fraud_detected",
            verification_result=verification_result["details"]
        )
        
        # Store in Supabase
        document = supabase.table("documents").insert(document_data.dict()).execute()
        
        # If verification successful, store on blockchain
        if verification_result["is_valid"]:
            tx_hash = await store_on_blockchain(document.id, verification_result)
            # Update document with transaction hash
            supabase.table("documents").update({"transaction_hash": tx_hash}).eq("id", document.id).execute()
        
        return document
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{document_id}", response_model=Document)
async def get_document_status(document_id: str):
    try:
        document = supabase.table("documents").select("*").eq("id", document_id).single().execute()
        return document
    except Exception as e:
        raise HTTPException(status_code=404, detail="Document not found") 