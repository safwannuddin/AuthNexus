from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DocumentBase(BaseModel):
    user_id: str
    document_type: str
    status: str = "pending"
    verification_result: Optional[str] = None
    transaction_hash: Optional[str] = None

class DocumentCreate(DocumentBase):
    pass

class Document(DocumentBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True 