from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float, Boolean, Text, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
import uuid

from core.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class VerificationStatus(str, enum.Enum):
    PENDING = "PENDING"
    VERIFIED = "VERIFIED"
    REJECTED = "REJECTED"
    ERROR = "ERROR"

class DocumentType(str, enum.Enum):
    ID_CARD = "ID_CARD"
    PASSPORT = "PASSPORT"
    DRIVER_LICENSE = "DRIVER_LICENSE"
    CERTIFICATE = "CERTIFICATE"
    CONTRACT = "CONTRACT"
    OTHER = "OTHER"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    documents = relationship("Document", back_populates="owner")

class Document(Base):
    __tablename__ = "documents"

    id = Column(String, primary_key=True, default=generate_uuid)
    title = Column(String)
    description = Column(String, nullable=True)
    file_path = Column(String)
    file_type = Column(String)  # mime type
    document_type = Column(Enum(DocumentType), default=DocumentType.OTHER)
    owner_id = Column(String, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    owner = relationship("User", back_populates="documents")
    verification = relationship("Verification", back_populates="document", uselist=False)

class Verification(Base):
    __tablename__ = "verifications"

    id = Column(String, primary_key=True, default=generate_uuid)
    document_id = Column(String, ForeignKey("documents.id"))
    status = Column(Enum(VerificationStatus), default=VerificationStatus.PENDING)
    confidence_score = Column(Float, nullable=True)
    verification_date = Column(DateTime(timezone=True), server_default=func.now())
    rejection_reason = Column(String, nullable=True)
    metadata = Column(Text, nullable=True)  # Store JSON as text
    blockchain_tx_hash = Column(String, nullable=True)
    
    document = relationship("Document", back_populates="verification")
