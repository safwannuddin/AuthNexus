import os
from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AuthNexus"
    
    # CORS settings - Using a regular field to avoid complex parsing
    CORS_ORIGINS: str = "http://localhost:3000,https://authnexus.io,https://app.authnexus.io"
    
    # Model configuration
    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8"
    }
    
    # Supabase settings    SUPABASE_URL: str
    SUPABASE_KEY: str
    SUPABASE_BUCKET: str = "documents"
    
    # AI model settings
    AI_MODEL_PATH: str = "models/document_verify_v1"
    OCR_CONFIDENCE_THRESHOLD: float = 0.85
    
    # Sui blockchain settings
    SUI_RPC_URL: str
    SUI_PACKAGE_ID: str
    SUI_PRIVATE_KEY: str
    
    # n8n automation settings
    N8N_WEBHOOK_URL: str
    N8N_API_KEY: str
    
    # Salesforce OAuth settings
    SALESFORCE_CLIENT_ID: str
    SALESFORCE_CLIENT_SECRET: str
    SALESFORCE_AUTH_URL: str
    SALESFORCE_TOKEN_URL: str
    SALESFORCE_CALLBACK_URL: str

@lru_cache()
def get_settings():
    return Settings()
