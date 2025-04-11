from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: str
    is_active: bool
    created_at: datetime

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    
class TokenPayload(BaseModel):
    sub: Optional[str] = None
    exp: Optional[int] = None

class UserDashboard(BaseModel):
    user_id: str
    total_documents: int
    verified_documents: int
    recent_activities: List[dict] = []
    documents_by_type: dict = {}
    verification_stats: dict = {}
    
    class Config:
        from_attributes = True
