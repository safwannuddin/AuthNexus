import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
from fastapi import HTTPException
from typing import Dict, Any, Tuple

from core.config import get_settings

settings = get_settings()


class DocumentVerifier:
    def __init__(self):
        self.ocr_confidence_threshold = settings.OCR_CONFIDENCE_THRESHOLD
        self.model_path = settings.AI_MODEL_PATH

        if not os.path.exists(self.model_path):
            os.makedirs(self.model_path, exist_ok=True)
            print(f"[INFO] Created model directory at {self.model_path}")

    def _preprocess_image(self, image_bytes: bytes) -> np.ndarray:
        """Preprocess the image for better analysis."""
        try:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            max_dimension = 1500
            height, width = img.shape[:2]
            if max(height, width) > max_dimension:
                scaling_factor = max_dimension / max(height, width)
                img = cv2.resize(img, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv2.INTER_AREA)

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            denoised = cv2.GaussianBlur(gray, (5, 5), 0)
            thresh = cv2.adaptiveThreshold(
                denoised, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
            )

            return thresh
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image preprocessing failed: {str(e)}")

    def _extract_text_and_features(self, processed_img: np.ndarray) -> Dict[str, Any]:
        """Extract text and features from the processed image using OCR."""
        try:
            pil_img = Image.fromarray(processed_img)
            ocr_data = pytesseract.image_to_data(pil_img, output_type=pytesseract.Output.DICT)

            text = " ".join([word for word in ocr_data['text'] if word.strip()])

            confidences = [
                float(conf) for conf in ocr_data['conf']
                if conf.isdigit() and int(conf) > 0
            ]
            avg_confidence = sum(confidences) / len(confidences) if confidences else 0.0

            structure = {
                "blocks": len(set(ocr_data['block_num'])) - 1,
                "paragraphs": len(set(ocr_data['par_num'])),
                "lines": len(set(ocr_data['line_num'])),
                "words": len([word for word in ocr_data['text'] if word.strip()]),
            }

            return {
                "text": text,
                "confidence": round(avg_confidence / 100, 3),
                "structure": structure
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Text extraction failed: {str(e)}")

    def _check_for_tampering(self, image_bytes: bytes) -> Dict[str, Any]:
        """Check for signs of image tampering using simple ELA-based logic."""
        try:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

            _, buffer = cv2.imencode('.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 90])
            compressed = cv2.imdecode(buffer, cv2.IMREAD_COLOR)
            compressed_gray = cv2.cvtColor(compressed, cv2.COLOR_BGR2GRAY)

            diff = cv2.absdiff(gray, compressed_gray)
            _, thresh = cv2.threshold(diff, 20, 255, cv2.THRESH_BINARY)

            tampering_score = np.count_nonzero(thresh) / (thresh.shape[0] * thresh.shape[1])

            return {
                "tampering_detected": tampering_score > 0.05,
                "tampering_score": round(tampering_score, 4)
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Tampering detection failed: {str(e)}")

    async def verify_document(self, file_content: bytes, document_type: str) -> Tuple[bool, Dict[str, Any]]:
        """
        Verify a document using OCR and image analysis.
        Returns a tuple of (is_verified, metadata)
        """
        try:
            processed_img = self._preprocess_image(file_content)
            ocr_result = self._extract_text_and_features(processed_img)
            tampering_result = self._check_for_tampering(file_content)

            passes_confidence = ocr_result['confidence'] >= self.ocr_confidence_threshold
            passes_tampering = not tampering_result['tampering_detected']
            is_verified = passes_confidence and passes_tampering

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


# Singleton instance to import elsewhere
document_service = DocumentVerifier()
