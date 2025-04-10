from fastapi import APIRouter, HTTPException, Query
from typing import Dict, List, Optional
import uuid
from datetime import datetime, timedelta
import random

from schemas.user import UserDashboard
from schemas.document import VerificationResult

router = APIRouter()

@router.get("/stats/{user_id}", response_model=Dict[str, any])
async def get_user_stats(user_id: str):
    """Get dashboard statistics for a user"""
    try:
        # In a real implementation, you would fetch this data from your database
        # For now, we'll return mock data
        
        return {
            "total_documents": random.randint(5, 20),
            "verified_documents": random.randint(3, 10),
            "pending_verification": random.randint(1, 5),
            "rejected_documents": random.randint(0, 3),
            "verification_success_rate": random.uniform(0.7, 0.95),
            "last_verification_date": (datetime.now() - timedelta(days=random.randint(1, 10))).isoformat(),
            "blockchain_secured": random.randint(3, 8)
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve statistics: {str(e)}")

@router.get("/recent-activity/{user_id}", response_model=List[Dict[str, any]])
async def get_recent_activity(
    user_id: str,
    limit: int = Query(5, ge=1, le=50)
):
    """Get recent activity for a user"""
    try:
        # In a real implementation, you would fetch this from your database
        # For now, we'll return mock data
        
        activities = []
        activity_types = ["document_uploaded", "verification_completed", "document_shared", "login"]
        statuses = ["SUCCESS", "PENDING", "REJECTED"]
        
        for i in range(limit):
            activity_type = random.choice(activity_types)
            status = random.choice(statuses)
            
            activities.append({
                "id": f"act_{uuid.uuid4().hex[:8]}",
                "user_id": user_id,
                "type": activity_type,
                "status": status,
                "timestamp": (datetime.now() - timedelta(days=i, hours=random.randint(0, 23))).isoformat(),
                "details": {
                    "document_type": random.choice(["passport", "id_card", "drivers_license"]) 
                    if activity_type in ["document_uploaded", "verification_completed"] else None
                }
            })
            
        # Sort by timestamp (most recent first)
        activities.sort(key=lambda x: x["timestamp"], reverse=True)
        
        return activities
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve recent activity: {str(e)}")

@router.get("/verification-history/{user_id}", response_model=List[VerificationResult])
async def get_verification_history(
    user_id: str,
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """Get verification history for a user"""
    try:
        # In a real implementation, you would fetch this from your database
        # For now, we'll return mock data
        
        history = []
        document_types = ["passport", "id_card", "drivers_license", "birth_certificate"]
        statuses = ["VERIFIED", "REJECTED", "REVIEW_NEEDED"]
        
        for i in range(limit):
            status = random.choice(statuses)
            is_genuine = status == "VERIFIED"
            confidence = random.uniform(0.5, 0.99)
            
            history.append({
                "id": f"ver_{uuid.uuid4().hex[:8]}",
                "user_id": user_id,
                "document_id": f"doc_{uuid.uuid4().hex[:8]}",
                "status": status,
                "confidence": confidence,
                "is_genuine": is_genuine,
                "verification_date": (datetime.now() - timedelta(days=i*3)).isoformat(),
                "extracted_data": {
                    "name": "John Doe",
                    "document_number": f"AB{random.randint(100000, 999999)}",
                    "expiry_date": (datetime.now() + timedelta(days=365*4)).strftime("%Y-%m-%d")
                },
                "blockchain_reference": f"sui:0x{uuid.uuid4().hex}" if status == "VERIFIED" else None
            })
            
        return history
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to retrieve verification history: {str(e)}")
