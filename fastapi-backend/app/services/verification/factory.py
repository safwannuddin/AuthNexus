from .base import BaseVerificationService
from .passport import PassportVerificationService
from .national_id import NationalIDVerificationService
from .custom import CustomVerificationService
from typing import Dict, Type

class VerificationServiceFactory:
    _services: Dict[str, Type[BaseVerificationService]] = {
        "passport": PassportVerificationService,
        "national_id": NationalIDVerificationService,
        "custom": CustomVerificationService
    }
    
    @classmethod
    def get_service(cls, document_type: str) -> BaseVerificationService:
        """
        Get the appropriate verification service for the given document type
        """
        service_class = cls._services.get(document_type)
        if not service_class:
            raise ValueError(f"No verification service found for document type: {document_type}")
        return service_class()
    
    @classmethod
    def get_supported_types(cls) -> list:
        """
        Get a list of all supported document types
        """
        return list(cls._services.keys()) 