import os
from typing import BinaryIO, Dict, Optional, List
import supabase
from fastapi import UploadFile, HTTPException

from core.config import get_settings

settings = get_settings()

# Initialize Supabase client
supabase_client = supabase.create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)

class SupabaseStorageService:
    """Service for handling file uploads to Supabase Storage"""
    
    def __init__(self, bucket_name: str = None):
        self.bucket_name = bucket_name or settings.SUPABASE_BUCKET
        self._ensure_bucket_exists()
    
    def _ensure_bucket_exists(self):
        """Ensure the bucket exists, create if not"""
        try:
            buckets = supabase_client.storage.list_buckets()
            bucket_names = [bucket['name'] for bucket in buckets]
            
            if self.bucket_name not in bucket_names:
                supabase_client.storage.create_bucket(self.bucket_name, options={
                    'public': False,
                    'file_size_limit': 10485760  # 10MB
                })
        except Exception as e:
            print(f"Error ensuring bucket exists: {e}")
    
    async def upload_file(self, 
                         file: UploadFile, 
                         folder: str = "", 
                         user_id: str = None) -> Dict:
        """Upload a file to Supabase storage"""
        try:
            # Create file path with folder and user_id if provided
            file_path = file.filename
            if folder:
                file_path = f"{folder}/{file_path}"
            if user_id:
                file_path = f"user_{user_id}/{file_path}"
            
            # Read file content
            file_content = await file.read()
            
            # Upload to Supabase
            result = supabase_client.storage \
                .from_(self.bucket_name) \
                .upload(file_path, file_content, {"content-type": file.content_type})
            
            if "error" in result:
                raise HTTPException(
                    status_code=500, 
                    detail=f"Upload failed: {result['error']}"
                )
            
            # Get public/signed URL
            file_url = supabase_client.storage \
                .from_(self.bucket_name) \
                .create_signed_url(file_path, 60 * 60 * 24) # 24 hour expiry
                
            return {
                "path": file_path,
                "url": file_url,
                "size": len(file_content),
                "mimetype": file.content_type
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")
    
    def get_file_url(self, file_path: str, expires_in: int = 3600) -> str:
        """Get a signed URL for a file"""
        try:
            url_data = supabase_client.storage \
                .from_(self.bucket_name) \
                .create_signed_url(file_path, expires_in)
                
            if "error" in url_data:
                raise HTTPException(
                    status_code=404, 
                    detail=f"File not found: {url_data['error']}"
                )
                
            return url_data["signedURL"]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error getting file URL: {str(e)}")
    
    def delete_file(self, file_path: str) -> bool:
        """Delete a file from storage"""
        try:
            result = supabase_client.storage \
                .from_(self.bucket_name) \
                .remove([file_path])
                
            if "error" in result:
                raise HTTPException(
                    status_code=500, 
                    detail=f"Delete failed: {result['error']}"
                )
                
            return True
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"File deletion failed: {str(e)}")

# Export an instance for easy import
storage_service = SupabaseStorageService()
