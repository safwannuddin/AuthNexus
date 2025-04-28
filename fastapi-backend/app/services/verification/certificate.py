from .base import BaseVerificationService
from typing import Dict, Any
import pytesseract
from PIL import Image
import logging
from datetime import datetime
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' 

logger = logging.getLogger(__name__)

class CertificateVerificationService(BaseVerificationService):
    def __init__(self):
        super().__init__()
        self.supported_types = ["certificate", "diploma", "degree"]
        
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify a certificate document
        """
        try:
            # Decode the image
            image = self.decode_base64_image(document_data)
            
            # Perform OCR to extract text
            text = pytesseract.image_to_string(image)
            
            # Basic validation checks
            is_valid = self._validate_certificate(text)
            confidence_score = self._calculate_confidence_score(text)
            
            details = {
                "extracted_text": text,
                "confidence_score": confidence_score,
                "verification_date": datetime.now().isoformat(),
                "validation_checks": {
                    "has_institution_name": bool(self._find_institution_name(text)),
                    "has_graduate_name": bool(self._find_graduate_name(text)),
                    "has_issue_date": bool(self._find_issue_date(text)),
                    "has_degree_type": bool(self._find_degree_type(text))
                }
            }
            
            return self.get_verification_result(is_valid, details)
            
        except Exception as e:
            logger.error(f"Error verifying certificate: {str(e)}")
            return self.get_verification_result(False, {
                "error_message": str(e),
                "confidence_score": 0.0,
                "verification_date": datetime.now().isoformat()
            })
    
    def _validate_certificate(self, text: str) -> bool:
        """
        Perform basic validation checks on the certificate text
        """
        checks = [
            self._find_institution_name(text),
            self._find_graduate_name(text),
            self._find_issue_date(text),
            self._find_degree_type(text)
        ]
        return all(checks)
    
    def _calculate_confidence_score(self, text: str) -> float:
        """
        Calculate a confidence score based on the presence of key elements
        """
        score = 0.0
        if self._find_institution_name(text):
            score += 0.3
        if self._find_graduate_name(text):
            score += 0.3
        if self._find_issue_date(text):
            score += 0.2
        if self._find_degree_type(text):
            score += 0.2
        return score
    
    def _find_institution_name(self, text: str) -> bool:
        """
        Look for institution name patterns
        """
        # This is a simple implementation. In production, you'd want to use
        # a more sophisticated approach with NLP or ML
        institution_keywords = ["university", "college", "institute", "academy", "school"]
        return any(keyword in text.lower() for keyword in institution_keywords)
    
    def _find_graduate_name(self, text: str) -> bool:
        """
        Look for graduate name patterns
        """
        # Simple check for common name patterns
        # In production, use NLP to identify names
        return "certified" in text.lower() or "awarded to" in text.lower()
    
    def _find_issue_date(self, text: str) -> bool:
        """
        Look for date patterns
        """
        # Simple check for date patterns
        # In production, use date parsing libraries
        date_keywords = ["issued", "dated", "date", "year"]
        return any(keyword in text.lower() for keyword in date_keywords)
    
    def _find_degree_type(self, text: str) -> bool:
        """
        Look for degree type patterns
        """
        degree_keywords = ["bachelor", "master", "doctor", "phd", "degree", "certificate", "diploma"]
        return any(keyword in text.lower() for keyword in degree_keywords) 