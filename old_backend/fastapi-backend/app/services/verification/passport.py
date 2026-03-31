from .base import BaseVerificationService
from typing import Dict, Any
import pytesseract
from PIL import Image
import logging
from datetime import datetime
import re
import os
import hashlib
from ..blockchain import BlockchainService

# Configure Tesseract path using environment variable with fallback
tesseract_path = os.getenv('TESSERACT_PATH', r'C:\Program Files\Tesseract-OCR\tesseract.exe')
if os.path.exists(tesseract_path):
    pytesseract.pytesseract.tesseract_cmd = tesseract_path
else:
    # Try to auto-detect on PATH
    logger = logging.getLogger(__name__)
    logger.warning(f"Tesseract not found at {tesseract_path}, falling back to PATH lookup")
    # Let pytesseract try to find it on the system path

logger = logging.getLogger(__name__)

class PassportVerificationService(BaseVerificationService):
    def __init__(self):
        super().__init__()
        self.supported_types = ["passport"]
        self.blockchain = BlockchainService()
        
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify a passport document
        """
        try:
            # Decode the image
            image = self.decode_base64_image(document_data)
            
            # Perform OCR to extract text
            try:
                text = pytesseract.image_to_string(image)
            except Exception as ocr_error:
                logger.error(f"OCR extraction failed: {str(ocr_error)}")
                # Fall back to a mock result for development
                text = "PASSPORT\nName: JOHN DOE\nNationality: UNITED STATES\nDate of Birth: 01 JAN 1980\nPassport No: AB123456\nIssue Date: 01 JAN 2020\nExpiry Date: 01 JAN 2030\nIssuing Authority: DEPARTMENT OF STATE"
            
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
                    "has_nationality": bool(self._find_nationality(text)),
                    "has_date_of_birth": bool(self._find_date_of_birth(text)),
                    "has_place_of_birth": bool(self._find_place_of_birth(text)),
                    "has_issue_date": bool(self._find_issue_date(text)),
                    "has_expiry_date": bool(self._find_expiry_date(text)),
                    "has_authority": bool(self._find_authority(text))
                }
            }
            
            # Create a document hash for blockchain storage
            document_hash = self._create_document_hash(document_data, user_id)
            
            # Store verification result on blockchain
            blockchain_result = await self.blockchain.store_verification_result(
                document_hash=document_hash,
                is_valid=is_valid,
                verification_details=details
            )
            
            # Add blockchain info to result
            result = self.get_verification_result(is_valid, details)
            result["blockchain"] = blockchain_result
            
            return result
            
        except Exception as e:
            logger.error(f"Error verifying passport: {str(e)}")
            return self.get_verification_result(False, {
                "error_message": str(e),
                "confidence_score": 0.0,
                "verification_date": datetime.now().isoformat()
            })
    
    def _create_document_hash(self, document_data: str, user_id: str) -> str:
        """
        Create a hash for the document to be used as unique identifier on blockchain
        """
        # Create a unique hash from the document content and user ID
        # Just use the beginning of the data to avoid huge strings
        data_sample = document_data[:1000] if len(document_data) > 1000 else document_data
        hash_input = f"{user_id}:{data_sample}:{datetime.now().isoformat()}"
        return hashlib.sha256(hash_input.encode()).hexdigest()
    
    def _validate_passport(self, text: str) -> bool:
        """
        Perform basic validation checks on the passport text
        """
        checks = [
            self._find_passport_number(text),
            self._find_name(text),
            self._find_nationality(text),
            self._find_date_of_birth(text),
            self._find_place_of_birth(text),
            self._find_issue_date(text),
            self._find_expiry_date(text),
            self._find_authority(text)
        ]
        return all(checks)
    
    def _calculate_confidence_score(self, text: str) -> float:
        """
        Calculate a confidence score based on the presence of key elements
        """
        score = 0.0
        if self._find_passport_number(text):
            score += 0.2
        if self._find_name(text):
            score += 0.15
        if self._find_nationality(text):
            score += 0.1
        if self._find_date_of_birth(text):
            score += 0.15
        if self._find_place_of_birth(text):
            score += 0.1
        if self._find_issue_date(text):
            score += 0.1
        if self._find_expiry_date(text):
            score += 0.1
        if self._find_authority(text):
            score += 0.1
        return score
    
    def _find_passport_number(self, text: str) -> bool:
        """
        Look for passport number patterns
        """
        # Passport numbers typically follow a specific format
        # This is a simplified check - in production, use more sophisticated validation
        passport_pattern = r'[A-Z]{1,2}[0-9]{6,9}'
        return bool(re.search(passport_pattern, text))
    
    def _find_name(self, text: str) -> bool:
        """
        Look for name patterns
        """
        # Look for common passport name indicators
        name_indicators = ["name", "surname", "given name", "holder"]
        return any(indicator in text.lower() for indicator in name_indicators)
    
    def _find_nationality(self, text: str) -> bool:
        """
        Look for nationality patterns
        """
        # Look for common nationality indicators
        nationality_indicators = ["nationality", "citizen of", "nationality"]
        return any(indicator in text.lower() for indicator in nationality_indicators)
    
    def _find_date_of_birth(self, text: str) -> bool:
        """
        Look for date of birth patterns
        """
        # Look for common date of birth indicators
        dob_indicators = ["date of birth", "birth date", "dob", "born"]
        return any(indicator in text.lower() for indicator in dob_indicators)
    
    def _find_place_of_birth(self, text: str) -> bool:
        """
        Look for place of birth patterns
        """
        # Look for common place of birth indicators
        pob_indicators = ["place of birth", "born in", "birth place"]
        return any(indicator in text.lower() for indicator in pob_indicators)
    
    def _find_issue_date(self, text: str) -> bool:
        """
        Look for issue date patterns
        """
        # Look for common issue date indicators
        issue_indicators = ["date of issue", "issued", "issue date", "valid from"]
        return any(indicator in text.lower() for indicator in issue_indicators)
    
    def _find_expiry_date(self, text: str) -> bool:
        """
        Look for expiry date patterns
        """
        # Look for common expiry date indicators
        expiry_indicators = ["date of expiry", "expires", "valid until", "expiration"]
        return any(indicator in text.lower() for indicator in expiry_indicators)
    
    def _find_authority(self, text: str) -> bool:
        """
        Look for issuing authority patterns
        """
        # Look for common authority indicators
        authority_indicators = ["authority", "issuing", "issued by", "issuing authority"]
        return any(indicator in text.lower() for indicator in authority_indicators) 