import os
import cv2
import numpy as np
from typing import Dict, List, Tuple, BinaryIO
from enum import Enum
import pytesseract
from PIL import Image
import io
import json

from core.config import get_settings
from services.storage.supabase import storage_service

settings = get_settings()

class DocumentType(str, Enum):
    PASSPORT = "passport"
    ID_CARD = "id_card"
    DRIVERS_LICENSE = "drivers_license"
    BIRTH_CERTIFICATE = "birth_certificate"
    UNKNOWN = "unknown"

class DocumentVerificationService:
    """Service for AI-based document verification"""
    
    def __init__(self):
        self.confidence_threshold = settings.OCR_CONFIDENCE_THRESHOLD
        # In a real implementation, you'd load trained models here
        
    def detect_document_type(self, image: np.ndarray) -> DocumentType:
        """Detect document type from image"""
        # This is a placeholder for actual ML model implementation
        # In a real system, you'd use a trained classifier
        
        # Simplified detection based on image dimensions and colors
        height, width, _ = image.shape
        aspect_ratio = width / height
        
        if 1.3 < aspect_ratio < 1.5:
            return DocumentType.PASSPORT
        elif aspect_ratio > 1.5:
            return DocumentType.DRIVERS_LICENSE
        elif aspect_ratio < 1.3:
            return DocumentType.ID_CARD
        
        return DocumentType.UNKNOWN
    
    def extract_text(self, image: np.ndarray) -> Dict[str, str]:
        """Extract text from document using OCR"""
        # Convert to PIL Image for tesseract
        pil_image = Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        # Perform OCR
        ocr_data = pytesseract.image_to_data(pil_image, output_type=pytesseract.Output.DICT)
        
        # Filter by confidence
        extracted_text = {}
        current_key = "general"
        
        for i in range(len(ocr_data["text"])):
            if int(ocr_data["conf"][i]) >= self.confidence_threshold * 100:
                text = ocr_data["text"][i].strip()
                if text:
                    if text.endswith(":"):
                        # This is likely a field name
                        current_key = text[:-1].lower().replace(" ", "_")
                    else:
                        # This is a value
                        if current_key in extracted_text:
                            extracted_text[current_key] += " " + text
                        else:
                            extracted_text[current_key] = text
        
        return extracted_text
    
    def check_for_tampering(self, image: np.ndarray) -> Tuple[bool, float]:
        """Check if the document shows signs of tampering"""
        # This would use specialized image analysis techniques
        # For now, we'll return a placeholder implementation
        
        # In a real system, you'd look for:
        # - Inconsistent lighting/shadows
        # - Digital alterations
        # - Font inconsistencies
        # - Document feature verification
        
        # Placeholder implementation
        tampered = False
        confidence = 0.95  # High confidence that document is genuine
        
        return not tampered, confidence
    
    async def verify_document(self, file_path: str, user_id: str) -> Dict:
        """Main verification function that processes a document"""
        try:
            # Get file URL
            file_url = storage_service.get_file_url(file_path)
            
            # Load image
            import requests
            response = requests.get(file_url)
            if response.status_code != 200:
                raise ValueError(f"Failed to download image from {file_url}")
            
            # Convert to OpenCV format
            image_array = np.asarray(bytearray(response.content), dtype=np.uint8)
            image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
            
            # Process document
            doc_type = self.detect_document_type(image)
            extracted_text = self.extract_text(image)
            is_genuine, confidence = self.check_for_tampering(image)
            
            # Create verification record
            verification_result = {
                "user_id": user_id,
                "document_type": doc_type,
                "is_genuine": is_genuine,
                "confidence": confidence,
                "extracted_data": extracted_text,
                "file_path": file_path,
                "status": "VERIFIED" if is_genuine and confidence > 0.9 else "REVIEW_NEEDED"
            }
            
            # In a real system, you'd store this in a database
            # For now, we'll just return it
            return verification_result
            
        except Exception as e:
            return {
                "user_id": user_id,
                "file_path": file_path,
                "status": "ERROR",
                "error": str(e)
            }

# Export an instance for easy import
document_service = DocumentVerificationService()
