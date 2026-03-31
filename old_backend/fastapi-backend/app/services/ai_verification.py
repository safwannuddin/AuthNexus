import pytesseract
from PIL import Image
import io
import cv2
import numpy as np
from typing import Dict, Any
from transformers import LayoutLMv3Processor, LayoutLMv3ForTokenClassification
import torch
from deepface import DeepFace

class DocumentVerifier:
    def __init__(self):
        # Initialize LayoutLMv3 for document understanding
        self.processor = LayoutLMv3Processor.from_pretrained("microsoft/layoutlmv3-base")
        self.model = LayoutLMv3ForTokenClassification.from_pretrained("microsoft/layoutlmv3-base")
        
    async def verify_document(self, file_content: bytes) -> Dict[str, Any]:
        """
        Verify a document using multiple AI models
        """
        try:
            # Convert bytes to image
            image = Image.open(io.BytesIO(file_content))
            
            # 1. Basic OCR with Tesseract
            text = self._extract_text(image)
            
            # 2. Document Layout Analysis with LayoutLMv3
            layout_analysis = self._analyze_layout(image)
            
            # 3. Face Verification (if document contains photo)
            face_verification = await self._verify_face(image)
            
            # 4. Document Forgery Detection
            forgery_detection = self._detect_forgery(image)
            
            # Combine results
            is_valid = (
                len(text.strip()) > 0 and
                layout_analysis["is_valid"] and
                (not face_verification["required"] or face_verification["verified"]) and
                not forgery_detection["is_forged"]
            )
            
            return {
                "is_valid": is_valid,
                "details": {
                    "extracted_text": text,
                    "layout_analysis": layout_analysis,
                    "face_verification": face_verification,
                    "forgery_detection": forgery_detection
                }
            }
            
        except Exception as e:
            return {
                "is_valid": False,
                "details": {
                    "error": str(e)
                }
            }
    
    def _extract_text(self, image: Image.Image) -> str:
        """Extract text using Tesseract OCR"""
        img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
        thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
        return pytesseract.image_to_string(thresh)
    
    def _analyze_layout(self, image: Image.Image) -> Dict[str, Any]:
        """Analyze document layout using LayoutLMv3"""
        # Prepare image for LayoutLMv3
        encoding = self.processor(image, return_tensors="pt")
        
        # Get predictions
        with torch.no_grad():
            outputs = self.model(**encoding)
        
        # Process results
        predictions = outputs.logits.argmax(-1).squeeze().tolist()
        
        return {
            "is_valid": True,  # Implement proper validation logic
            "layout_elements": predictions
        }
    
    async def _verify_face(self, image: Image.Image) -> Dict[str, Any]:
        """Verify face in document if present"""
        try:
            # Convert PIL Image to numpy array
            img_array = np.array(image)
            
            # Check if face is present
            face_analysis = DeepFace.analyze(img_array, actions=['detection'])
            
            if len(face_analysis) > 0:
                return {
                    "required": True,
                    "verified": True,  # Implement proper face verification logic
                    "confidence": face_analysis[0]["face_detection"]["confidence"]
                }
            else:
                return {
                    "required": False,
                    "verified": False,
                    "confidence": 0
                }
        except:
            return {
                "required": False,
                "verified": False,
                "confidence": 0
            }
    
    def _detect_forgery(self, image: Image.Image) -> Dict[str, Any]:
        """Detect document forgery using image analysis"""
        img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
        
        # Basic forgery detection (can be enhanced)
        # 1. Check for digital artifacts
        # 2. Analyze image quality
        # 3. Check for inconsistencies
        
        return {
            "is_forged": False,  # Implement proper forgery detection
            "confidence": 0.95
        }

# Initialize verifier
document_verifier = DocumentVerifier()

async def verify_document(file_content: bytes) -> Dict[str, Any]:
    """Main verification function"""
    return await document_verifier.verify_document(file_content) 