# filepath: services/storage/supabase.py

import os
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List

from fastapi import UploadFile, HTTPException
from supabase import create_client, Client

from core.config import get_settings

settings = get_settings()

# ---------------------- Mock Implementations ----------------------
class MockStorageClient:
    def list_buckets(self) -> List[Dict[str, Any]]:
        return []

    def create_bucket(self, name: str, options: Optional[Dict] = None) -> Dict[str, str]:
        return {"name": name}

    def from_(self, bucket: str):
        return self

    def upload(self, path: str, data: bytes, options: Optional[Dict] = None) -> Dict[str, str]:
        return {"path": path}

    def create_signed_url(self, path: str, expires_in: int) -> Dict[str, str]:
        return {"signedURL": f"http://localhost:8000/mock-storage/{path}"}

    def remove(self, paths: List[str]) -> Dict[str, Any]:
        return {"data": True}

class MockSupabaseClient:
    def __init__(self):
        self.storage = MockStorageClient()

    def from_(self, table: str):
        return self.storage

# ---------------------- Supabase Service ----------------------
class SupabaseService:
    def __init__(self):
        self.supabase_url = settings.SUPABASE_URL
        self.supabase_key = settings.SUPABASE_KEY
        self.bucket_name = settings.SUPABASE_BUCKET

        try:
            self.client: Client = create_client(self.supabase_url, self.supabase_key)
        except Exception as e:
            print(f"[WARNING] Supabase connection failed. Using mock client. Error: {e}")
            self.client = MockSupabaseClient()

        try:
            self._ensure_bucket_exists()
        except Exception as e:
            print(f"[WARNING] Bucket validation failed. Continuing anyway. Error: {e}")

    def _ensure_bucket_exists(self):
        buckets = self.client.storage.list_buckets()
        if not any(bucket['name'] == self.bucket_name for bucket in buckets):
            self.client.storage.create_bucket(self.bucket_name, {"public": False})

    async def upload_file(self, file: UploadFile, user_id: str) -> str:
        if not file:
            raise HTTPException(status_code=400, detail="No file provided")

        timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
        extension = os.path.splitext(file.filename)[1]
        unique_name = f"{user_id}/{timestamp}_{uuid.uuid4()}{extension}"

        try:
            content = await file.read()
            result = self.client.storage.from_(self.bucket_name).upload(
                unique_name, content, {"content-type": file.content_type}
            )
            return result["path"] if isinstance(result, dict) else unique_name
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

    def generate_presigned_url(self, file_path: str, expires_in_seconds: int = 3600) -> str:
        try:
            result = self.client.storage.from_(self.bucket_name).create_signed_url(
                file_path, expires_in_seconds
            )
            return result["signedURL"]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"URL generation failed: {str(e)}")

    def delete_file(self, file_path: str) -> bool:
        try:
            result = self.client.storage.from_(self.bucket_name).remove([file_path])
            return result.get("data", True)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Delete failed: {str(e)}")

# ✅ Singleton instance (import and use elsewhere)
storage_service = SupabaseService()
