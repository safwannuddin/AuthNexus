from .base import BaseVerificationService
from typing import Dict, Any
import pytesseract
from PIL import Image
import logging
from datetime import datetime
import re

logger = logging.getLogger(__name__)

class PassportVerificationService(BaseVerificationService):
    def __init__(self):
        super().__init__()
        self.supported_types = ["passport"]
        
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify a passport document
        """
        try:
            # Decode the image
            image = self.decode_base64_image(document_data)
            
            # Perform OCR to extract text
            text = pytesseract.image_to_string(image)
            
            # Basic validation checks
            is_valid = self._validate_passport(text)
            confidence_score = self._calculate_confidence_score(text)
            
            details = {
                "extracted_text": text,
                "confidence_score": confidence_score,
                "verification_date": datetime.now().isoformat(),
                "validation_checks": {
                    "has_passport_number": bool(self._find_passport_number(text)),
                    "has_name": bool(self._find_name(text)),
                    "has_date_of_birth": bool(self._find_date_of_birth(text)),
                    "has_expiry_date": bool(self._find_expiry_date(text)),
                    "has_nationality": bool(self._find_nationality(text))
                }
            }
            
            return self.get_verification_result(is_valid, details)
            
        except Exception as e:
            logger.error(f"Error verifying passport: {str(e)}")
            return self.get_verification_result(False, {
                "error_message": str(e),
                "confidence_score": 0.0,
                "verification_date": datetime.now().isoformat()
            })
    
    def _validate_passport(self, text: str) -> bool:
        """
        Perform basic validation checks on the passport text
        """
        checks = [
            self._find_passport_number(text),
            self._find_name(text),
            self._find_date_of_birth(text),
            self._find_expiry_date(text),
            self._find_nationality(text)
        ]
        return all(checks)
    
    def _calculate_confidence_score(self, text: str) -> float:
        """
        Calculate a confidence score based on the presence of key elements
        """
        score = 0.0
        if self._find_passport_number(text):
            score += 0.3
        if self._find_name(text):
            score += 0.2
        if self._find_date_of_birth(text):
            score += 0.2
        if self._find_expiry_date(text):
            score += 0.2
        if self._find_nationality(text):
            score += 0.1
        return score
    
    def _find_passport_number(self, text: str) -> bool:
        """
        Look for passport number patterns
        """
        # Passport numbers typically follow a specific format
        # This is a simplified check - in production, use more sophisticated validation
        passport_pattern = r'[A-Z]{1,2}\d{7,9}'
        return bool(re.search(passport_pattern, text))
    
    def _find_name(self, text: str) -> bool:
        """
        Look for name patterns
        """
        # Look for common passport name indicators
        name_indicators = ["surname", "given names", "name", "holder"]
        return any(indicator in text.lower() for indicator in name_indicators)
    
    def _find_date_of_birth(self, text: str) -> bool:
        """
        Look for date of birth patterns
        """
        # Look for common date of birth indicators
        dob_indicators = ["date of birth", "birth date", "dob"]
        return any(indicator in text.lower() for indicator in dob_indicators)
    
    def _find_expiry_date(self, text: str) -> bool:
        """
        Look for expiry date patterns
        """
        # Look for common expiry date indicators
        expiry_indicators = ["expiry", "expires", "valid until", "date of expiry"]
        return any(indicator in text.lower() for indicator in expiry_indicators)
    
    def _find_nationality(self, text: str) -> bool:
        """
        Look for nationality patterns
        """
        # Look for common nationality indicators
        nationality_indicators = ["nationality", "citizen of", "place of birth"]
        return any(indicator in text.lower() for indicator in nationality_indicators) 