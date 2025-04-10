from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql import text

from .config import get_settings

settings = get_settings()

# Extract database URL from Supabase connection string
# Format: postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
DATABASE_URL = settings.SUPABASE_URL.replace("https://", "postgresql://postgres:")
if "@" not in DATABASE_URL:
    # If URL doesn't have correct format, use a fallback
    DATABASE_URL = f"postgresql://postgres:{settings.SUPABASE_KEY}@db.{settings.SUPABASE_URL.split('//')[1].split('.')[0]}.supabase.co:5432/postgres"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Health check function
def check_db_connection():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False
