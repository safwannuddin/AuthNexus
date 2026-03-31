from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

load_dotenv()

class Settings(BaseSettings):
    # Supabase Configuration
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # Polygon Configuration
    POLYGON_RPC_URL: str = os.getenv("POLYGON_RPC_URL", "")
    CONTRACT_ADDRESS: str = os.getenv("CONTRACT_ADDRESS", "")
    
    # Clerk Configuration
    CLERK_SECRET_KEY: str = os.getenv("CLERK_SECRET_KEY", "")
    
    class Config:
        env_file = ".env"

settings = Settings() 