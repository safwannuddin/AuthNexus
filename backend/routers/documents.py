from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from typing import Dict, List, Optional
import uuid

from services.storage.supabase import storage_service
from services.ai.document_verification import document_service
from services.blockchain.sui import blockchain_service
from services.automation.n8n_integration import automation_service
from schemas.document import (
    DocumentCreate, DocumentUploadResponse, VerificationResult,
    DocumentType, BlockchainLogResponse
)

router = APIRouter()

@router.post("/upload", response_model=DocumentUploadResponse)
async def upload_document(
    document_type: DocumentType = Form(...),
    description: Optional[str] = Form(None),
    user_id: str = Form(...),
    file: UploadFile = File(...),
):
    """Upload a document for verification"""
    try:
        # Generate a unique ID for the document
        document_id = f"doc_{uuid.uuid4().hex}"
        
        # Upload file to storage
        folder = f"documents/{document_type}"
        upload_result = await storage_service.upload_file(
            file=file,
            folder=folder,
            user_id=user_id
        )
        
        # Create response object
        response = DocumentUploadResponse(
            id=document_id,
            user_id=user_id,
            document_type=document_type,
            file_path=upload_result["path"],
            file_url=upload_result["url"],
            upload_status="SUCCESS",
            created_at=datetime.now()
        )
        
        # Trigger automation workflow for document upload
        await automation_service.trigger_workflow(
            event_type="document_uploaded",
            payload={
                "document_id": document_id,
                "user_id": user_id,
                "document_type": document_type,
                "file_path": upload_result["path"]
            }
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document upload failed: {str(e)}")

@router.post("/verify/{document_id}", response_model=VerificationResult)
async def verify_document(
    document_id: str,
    user_id: str,
    file_path: str
):
    """Verify an uploaded document using AI"""
    try:
        # Generate a unique verification ID
        verification_id = f"ver_{uuid.uuid4().hex}"
        
        # Run AI verification
        verification_result = await document_service.verify_document(
            file_path=file_path,
            user_id=user_id
        )
        
        # Add verification and document IDs
        verification_result["id"] = verification_id
        verification_result["document_id"] = document_id
        verification_result["verification_date"] = datetime.now()
        
        # Log to blockchain if document is verified
        if verification_result["status"] in ["VERIFIED", "REVIEW_NEEDED"]:
            blockchain_log = await blockchain_service.log_verification(
                verification_id=verification_id,
                document_data={"document_id": document_id, "user_id": user_id},
                verification_result=verification_result
            )
            
            # Add blockchain reference to result
            if blockchain_log["status"] == "SUCCESS":
                verification_result["blockchain_reference"] = f"sui:{blockchain_log['transaction_hash']}"
        
        # Trigger automation workflow
        await automation_service.handle_document_verification(verification_result)
        
        return VerificationResult(**verification_result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document verification failed: {str(e)}")

@router.get("/blockchain/{verification_id}", response_model=BlockchainLogResponse)
async def get_blockchain_verification(verification_id: str):
    """Verify a document on the blockchain"""
    try:
        blockchain_result = await blockchain_service.verify_on_chain(verification_id)
        return blockchain_result
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Blockchain verification failed: {str(e)}")
