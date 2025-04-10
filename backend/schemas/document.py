from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from enum import Enum

class DocumentType(str, Enum):
    ID_CARD = "ID_CARD"
    PASSPORT = "PASSPORT"
    DRIVER_LICENSE = "DRIVER_LICENSE"
    CERTIFICATE = "CERTIFICATE"
    CONTRACT = "CONTRACT"
    OTHER = "OTHER"

class VerificationStatus(str, Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    ERROR = "ERROR"

class DocumentBase(BaseModel):
    title: str
    description: Optional[str] = None
    document_type: DocumentType = DocumentType.OTHER

class DocumentCreate(DocumentBase):
    pass

class VerificationBase(BaseModel):
    status: VerificationStatus
    confidence_score: Optional[float] = None
    rejection_reason: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    blockchain_tx_hash: Optional[str] = None

class VerificationCreate(BaseModel):
    document_id: str

class VerificationUpdate(BaseModel):
    status: Optional[VerificationStatus] = None
    confidence_score: Optional[float] = None
    rejection_reason: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None
    blockchain_tx_hash: Optional[str] = None

class VerificationResponse(VerificationBase):
    id: str
    document_id: str
    verification_date: datetime

    class Config:
        orm_mode = True

class DocumentResponse(DocumentBase):
    id: str
    file_path: str
    file_type: str
    created_at: datetime
    owner_id: str
    verification: Optional[VerificationResponse] = None

    class Config:
        orm_mode = True
