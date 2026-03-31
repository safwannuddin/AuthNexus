from abc import ABC, abstractmethod
from typing import Dict, Any
import base64
import io
from PIL import Image
import logging
from ..image_enhancement import ImageEnhancer

logger = logging.getLogger(__name__)

class BaseVerificationService(ABC):
    def __init__(self):
        self.supported_types = []
        self.image_enhancer = ImageEnhancer()

    @abstractmethod
    async def verify(self, document_data: str, document_type: str, user_id: str) -> Dict[str, Any]:
        """
        Verify a document and return the verification result
        """
        pass

    def is_supported(self, document_type: str) -> bool:
        return document_type.lower() in self.supported_types

    def decode_base64_image(self, base64_string: str) -> Image.Image:
        """
        Convert base64 string to PIL Image
        """
        try:
            # Remove the data URL prefix if present
            if ',' in base64_string:
                base64_string = base64_string.split(',')[1]
            
            # Decode base64 string
            image_data = base64.b64decode(base64_string)
            
            # Convert to PIL Image
            image = Image.open(io.BytesIO(image_data))
            
            # Enhance image quality
            enhanced_image = self.image_enhancer.enhance_for_ocr(image)
            
            return enhanced_image
        except Exception as e:
            logger.error(f"Error decoding image: {str(e)}")
            raise ValueError("Invalid image data")

    def get_verification_result(self, is_valid: bool, details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Format the verification result
        """
        return {
            "is_valid": is_valid,
            "details": details,
            "confidence_score": details.get("confidence_score", 0.0),
            "verification_date": details.get("verification_date"),
            "error_message": details.get("error_message")
        } 