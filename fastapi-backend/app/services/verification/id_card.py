from .base import BaseVerificationService
from typing import Dict, Any
import pytesseract
from PIL import Image
import logging
from datetime import datetime
import re

logger = logging.getLogger(__name__)

class IDCardVerificationService(BaseVerificationService):
    def __init__(self):
        super().__init__()
        self.supported_types = ["id_card"]
        
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify an ID card document
        """
        try:
            # Decode the image
            image = self.decode_base64_image(document_data)
            
            # Perform OCR to extract text
            text = pytesseract.image_to_string(image)
            
            # Basic validation checks
            is_valid = self._validate_id_card(text)
            confidence_score = self._calculate_confidence_score(text)
            
            details = {
                "extracted_text": text,
                "confidence_score": confidence_score,
                "verification_date": datetime.now().isoformat(),
                "validation_checks": {
                    "has_id_number": bool(self._find_id_number(text)),
                    "has_name": bool(self._find_name(text)),
                    "has_date_of_birth": bool(self._find_date_of_birth(text)),
                    "has_address": bool(self._find_address(text)),
                    "has_issue_date": bool(self._find_issue_date(text))
                }
            }
            
            return self.get_verification_result(is_valid, details)
            
        except Exception as e:
            logger.error(f"Error verifying ID card: {str(e)}")
            return self.get_verification_result(False, {
                "error_message": str(e),
                "confidence_score": 0.0,
                "verification_date": datetime.now().isoformat()
            })
    
    def _validate_id_card(self, text: str) -> bool:
        """
        Perform basic validation checks on the ID card text
        """
        checks = [
            self._find_id_number(text),
            self._find_name(text),
            self._find_date_of_birth(text),
            self._find_address(text),
            self._find_issue_date(text)
        ]
        return all(checks)
    
    def _calculate_confidence_score(self, text: str) -> float:
        """
        Calculate a confidence score based on the presence of key elements
        """
        score = 0.0
        if self._find_id_number(text):
            score += 0.3
        if self._find_name(text):
            score += 0.2
        if self._find_date_of_birth(text):
            score += 0.2
        if self._find_address(text):
            score += 0.2
        if self._find_issue_date(text):
            score += 0.1
        return score
    
    def _find_id_number(self, text: str) -> bool:
        """
        Look for ID number patterns
        """
        # ID numbers typically follow a specific format
        # This is a simplified check - in production, use more sophisticated validation
        id_pattern = r'\d{8,12}'
        return bool(re.search(id_pattern, text))
    
    def _find_name(self, text: str) -> bool:
        """
        Look for name patterns
        """
        # Look for common ID card name indicators
        name_indicators = ["name", "full name", "surname", "given name"]
        return any(indicator in text.lower() for indicator in name_indicators)
    
    def _find_date_of_birth(self, text: str) -> bool:
        """
        Look for date of birth patterns
        """
        # Look for common date of birth indicators
        dob_indicators = ["date of birth", "birth date", "dob", "born"]
        return any(indicator in text.lower() for indicator in dob_indicators)
    
    def _find_address(self, text: str) -> bool:
        """
        Look for address patterns
        """
        # Look for common address indicators
        address_indicators = ["address", "residence", "domicile", "street"]
        return any(indicator in text.lower() for indicator in address_indicators)
    
    def _find_issue_date(self, text: str) -> bool:
        """
        Look for issue date patterns
        """
        # Look for common issue date indicators
        issue_indicators = ["issue date", "issued", "date of issue", "valid from"]
        return any(indicator in text.lower() for indicator in issue_indicators) 