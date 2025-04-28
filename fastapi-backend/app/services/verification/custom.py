from .base import BaseVerificationService
from typing import Dict, Any
import pytesseract
from PIL import Image
import logging
from datetime import datetime
import re

logger = logging.getLogger(__name__)

class CustomVerificationService(BaseVerificationService):
    def __init__(self):
        super().__init__()
        self.supported_types = ["custom"]
        
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify a custom document
        """
        try:
            # Decode the image
            image = self.decode_base64_image(document_data)
            
            # Perform OCR to extract text
            text = pytesseract.image_to_string(image)
            
            # Basic validation checks
            is_valid = self._validate_custom_document(text)
            confidence_score = self._calculate_confidence_score(text)
            
            details = {
                "extracted_text": text,
                "confidence_score": confidence_score,
                "verification_date": datetime.now().isoformat(),
                "validation_checks": {
                    "has_text": bool(text.strip()),
                    "has_dates": bool(self._find_dates(text)),
                    "has_numbers": bool(self._find_numbers(text)),
                    "has_names": bool(self._find_names(text))
                }
            }
            
            return self.get_verification_result(is_valid, details)
            
        except Exception as e:
            logger.error(f"Error verifying custom document: {str(e)}")
            return self.get_verification_result(False, {
                "error_message": str(e),
                "confidence_score": 0.0,
                "verification_date": datetime.now().isoformat()
            })
    
    def _validate_custom_document(self, text: str) -> bool:
        """
        Perform basic validation checks on the custom document text
        """
        # For custom documents, we just check if there's any meaningful text
        return bool(text.strip())
    
    def _calculate_confidence_score(self, text: str) -> float:
        """
        Calculate a confidence score based on the presence of key elements
        """
        score = 0.0
        if text.strip():
            score += 0.4
        if self._find_dates(text):
            score += 0.2
        if self._find_numbers(text):
            score += 0.2
        if self._find_names(text):
            score += 0.2
        return score
    
    def _find_dates(self, text: str) -> bool:
        """
        Look for date patterns
        """
        # Look for common date formats
        date_patterns = [
            r'\d{1,2}/\d{1,2}/\d{2,4}',  # MM/DD/YYYY or DD/MM/YYYY
            r'\d{1,2}-\d{1,2}-\d{2,4}',  # MM-DD-YYYY or DD-MM-YYYY
            r'\d{4}-\d{2}-\d{2}',        # YYYY-MM-DD
            r'\d{2}/\d{2}/\d{4}',        # MM/DD/YYYY
            r'\d{2}-\d{2}-\d{4}'         # MM-DD-YYYY
        ]
        return any(bool(re.search(pattern, text)) for pattern in date_patterns)
    
    def _find_numbers(self, text: str) -> bool:
        """
        Look for number patterns
        """
        # Look for sequences of numbers
        number_pattern = r'\d{3,}'
        return bool(re.search(number_pattern, text))
    
    def _find_names(self, text: str) -> bool:
        """
        Look for name patterns
        """
        # Look for common name indicators
        name_indicators = ["name", "surname", "given name", "holder", "signature"]
        return any(indicator in text.lower() for indicator in name_indicators) 