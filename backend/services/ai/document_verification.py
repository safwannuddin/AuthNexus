import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
import json
import io
from fastapi import HTTPException
from typing import Dict, Any, Tuple

from core.config import get_settings

settings = get_settings()

class DocumentVerifier:
    def __init__(self):
        self.ocr_confidence_threshold = settings.OCR_CONFIDENCE_THRESHOLD
        self.model_path = settings.AI_MODEL_PATH
        
        # Check if model path exists
        if not os.path.exists(self.model_path):
            os.makedirs(self.model_path, exist_ok=True)
            print(f"Created model directory at {self.model_path}")

    def _preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """Preprocess the image for better analysis."""
        try:
            # Convert bytes to numpy array
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Resize for consistency if needed
            max_dimension = 1500
            height, width = img.shape[:2]
            if max(height, width) > max_dimension:
                scaling_factor = max_dimension / max(height, width)
                img = cv2.resize(img, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv2.INTER_AREA)
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Denoise
            denoised = cv2.GaussianBlur(gray, (5, 5), 0)
            
            # Adaptive thresholding
            thresh = cv2.adaptiveThreshold(
                denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
            )
            
            return thresh
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image preprocessing failed: {str(e)}")

    def _extract_text_and_features(self, processed_img: np.ndarray) -> Dict[str, Any]:
        """Extract text and features from the processed image using OCR."""
        try:
            # Convert numpy array to PIL Image for pytesseract
            pil_img = Image.fromarray(processed_img)
            
            # Extract text and structured data
            ocr_data = pytesseract.image_to_data(pil_img, output_type=pytesseract.Output.DICT)
            
            # Extract complete text
            text = " ".join([word for word in ocr_data['text'] if word.strip()])
            
            # Calculate confidence scores
            confidences = [conf for conf in ocr_data['conf'] if conf > 0]
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0
            
            # Extract structure information
            structure = {
                "blocks": len(set(ocr_data['block_num'])) - 1,  # Subtract 1 for background
                "paragraphs": len(set(ocr_data['par_num'])),
                "lines": len(set(ocr_data['line_num'])),
                "words": len([word for word in ocr_data['text'] if word.strip()]),
            }
            
            return {
                "text": text,
                "confidence": avg_confidence / 100,  # Normalize to 0-1
                "structure": structure
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

    def _check_for_tampering(self, image_bytes: bytes) -> Dict[str, Any]:
        """Check for signs of image tampering."""
        try:
            # Convert bytes to numpy array
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            # Convert to grayscale
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            
            # Error Level Analysis (simple implementation)
            # Save as JPEG with quality 90
            _, buffer = cv2.imencode('.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 90])
            
            # Read back the compressed image
            compressed = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
            compressed_gray = cv2.cvtColor(compressed, cv2.COLOR_BGR2GRAY)
            
            # Calculate absolute difference
            diff = cv2.absdiff(gray, compressed_gray)
            
            # Threshold the difference
            _, thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)
            
            # Count non-zero pixels in the threshold
            tampering_score = np.count_nonzero(thresh) / (thresh.shape[0] * thresh.shape[1])
            
            return {
                "tampering_detected": tampering_score > 0.05,
                "tampering_score": tampering_score
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Tampering detection failed: {str(e)}")

    async def verify_document(self, file_content: bytes, document_type: str) -> Tuple[bool, Dict[str, Any]]:
        """
        Verify a document using OCR and image analysis.
        Returns a tuple of (is_verified, metadata)
        """
        try:
            # Preprocess image
            processed_img = self._preprocess_image(file_content)
            
            # Extract text and features
            ocr_result = self._extract_text_and_features(processed_img)
            
            # Check for tampering
            tampering_result = self._check_for_tampering(file_content)
            
            # Determine if document passes verification
            passes_confidence = ocr_result['confidence'] >= self.ocr_confidence_threshold
            passes_tampering = not tampering_result['tampering_detected']
            
            # Verification result
            is_verified = passes_confidence and passes_tampering
            
            # Combine metadata
            metadata = {
                "ocr": ocr_result,
                "tampering": tampering_result,
                "document_type": document_type,
                "verification_factors": {
                    "ocr_confidence": passes_confidence,
                    "tampering_check": passes_tampering
                }
            }
            
            return is_verified, metadata
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Document verification failed: {str(e)}")

# Singleton instance
document_verifier = DocumentVerifier()
