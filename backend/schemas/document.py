from typing import Dict, Optional, List, Any
from enum import Enum
from pydantic import BaseModel, Field
from datetime import datetime

class DocumentType(str, Enum):
    PASSPORT = "passport"
    ID_CARD = "id_card"
    DRIVERS_LICENSE = "drivers_license"
    BIRTH_CERTIFICATE = "birth_certificate"
    OTHER = "other"

class VerificationStatus(str, Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    REVIEW_NEEDED = "REVIEW_NEEDED"
    ERROR = "ERROR"

class DocumentBase(BaseModel):
    document_type: DocumentType
    description: Optional[str] = None

class DocumentCreate(DocumentBase):
    user_id: str

class DocumentUploadResponse(BaseModel):
    id: str
    user_id: str
    document_type: DocumentType
    file_path: str
    file_url: Optional[str] = None
    upload_status: str = "SUCCESS"
    created_at: datetime
    
class VerificationResult(BaseModel):
    id: str
    user_id: str
    document_id: str
    status: VerificationStatus
    confidence: float
    is_genuine: bool
    verification_date: datetime
    extracted_data: Optional[Dict[str, Any]] = None
    blockchain_reference: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "id": "ver_123456789",
                "user_id": "usr_987654321",
                "document_id": "doc_123456789",
                "status": "VERIFIED",
                "confidence": 0.95,
                "is_genuine": True,
                "verification_date": "2023-04-15T14:30:00Z",
                "extracted_data": {
                    "name": "John Doe",
                    "document_number": "AB123456",
                    "expiry_date": "2025-01-01"
                },
                "blockchain_reference": "sui:0x1234567890abcdef"
            }
        }

class BlockchainLogResponse(BaseModel):
    status: str
    blockchain: Optional[str] = None
    transaction_hash: Optional[str] = None
    verification_id: str
    document_hash: Optional[str] = None
    timestamp: int
