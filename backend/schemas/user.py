from typing import Optional, List
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    company: Optional[str] = None
    
class UserCreate(UserBase):
    password: str = Field(..., min_length=8)

class UserResponse(UserBase):
    id: str
    created_at: datetime
    is_verified: bool = False
    verification_level: int = 0
    
    class Config:
        schema_extra = {
            "example": {
                "id": "usr_123456789",
                "email": "user@example.com",
                "first_name": "John",
                "last_name": "Doe",
                "company": "ACME Corp",
                "created_at": "2023-04-15T12:00:00Z",
                "is_verified": True,
                "verification_level": 2
            }
        }

class UserDashboard(UserResponse):
    documents_count: int = 0
    pending_verifications: int = 0
    last_activity: Optional[datetime] = None
    
class Token(BaseModel):
    access_token: str
    token_type: str
    
class TokenPayload(BaseModel):
    sub: str
    exp: int
