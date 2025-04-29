import cv2
import numpy as np
from PIL import Image
import io
import logging

logger = logging.getLogger(__name__)

class ImageEnhancer:
    @staticmethod
    def enhance_image(image: Image.Image) -> Image.Image:
        """
        Enhance image quality for better OCR results
        """
        try:
            # Convert PIL Image to OpenCV format
            img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            # Convert to grayscale
            gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
            
            # Apply adaptive thresholding
            thresh = cv2.adaptiveThreshold(
                gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
                cv2.THRESH_BINARY, 11, 2
            )
            
            # Denoise the image
            denoised = cv2.fastNlMeansDenoising(thresh)
            
            # Apply morphological operations to clean up the image
            kernel = np.ones((1, 1), np.uint8)
            cleaned = cv2.morphologyEx(denoised, cv2.MORPH_CLOSE, kernel)
            
            # Convert back to PIL Image
            enhanced_image = Image.fromarray(cleaned)
            
            return enhanced_image
            
        except Exception as e:
            logger.error(f"Error enhancing image: {str(e)}")
            return image  # Return original image if enhancement fails
    
    @staticmethod
    def enhance_for_ocr(image: Image.Image) -> Image.Image:
        """
        Apply OCR-specific enhancements
        """
        try:
            # Convert PIL Image to OpenCV format
            img_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
            
            # Convert to grayscale
            gray = cv2.cvtColor(img_cv, cv2.COLOR_BGR2GRAY)
            
            # Apply bilateral filter to reduce noise while preserving edges
            bilateral = cv2.bilateralFilter(gray, 9, 75, 75)
            
            # Apply Otsu's thresholding
            _, thresh = cv2.threshold(bilateral, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # Apply dilation to make text more prominent
            kernel = np.ones((1, 1), np.uint8)
            dilated = cv2.dilate(thresh, kernel, iterations=1)
            
            # Convert back to PIL Image
            enhanced_image = Image.fromarray(dilated)
            
            return enhanced_image
            
        except Exception as e:
            logger.error(f"Error enhancing image for OCR: {str(e)}")
            return image  # Return original image if enhancement fails 