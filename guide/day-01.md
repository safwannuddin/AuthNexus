# Day 01 - FastAPI Foundation + DB Connection

## Day goal

Set up a working FastAPI app with PostgreSQL connection, SQLAlchemy session handling, and first `User` model + Pydantic schemas.

## What to learn today

1. FastAPI app entrypoint
2. Pydantic settings from `.env`
3. SQLAlchemy engine/session/base
4. ORM model basics
5. Pydantic schema basics

## Files to create today

1. `backend_v2/app/main.py`
2. `backend_v2/app/core/config.py`
3. `backend_v2/app/db/database.py`
4. `backend_v2/app/db/models/user.py`
5. `backend_v2/app/schemas/user.py`

## Step 1: app/core/config.py

```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "AuthNexus Backend V2"
    app_env: str = "development"
    app_debug: bool = True

    database_url: str

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60

    upload_dir: str = "uploads"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
```

Why: central config avoids hardcoded values and environment drift.

## Step 2: app/db/database.py

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings


class Base(DeclarativeBase):
    pass


engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

Why: each request gets isolated DB session.

## Step 3: app/db/models/user.py

```python
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default="user", nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
```

Why: strong user identity base for auth and ownership.

## Step 4: app/schemas/user.py

```python
from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    role: str
    is_active: bool

    model_config = {"from_attributes": True}
```

Why: route input/output contracts are separated from ORM models.

## Step 5: app/main.py

```python
from fastapi import FastAPI

from app.core.config import settings
from app.db.database import Base, engine

app = FastAPI(title=settings.app_name, debug=settings.app_debug)


@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict:
    return {"status": "ok", "env": settings.app_env}
```

Why: startup creates tables for initial dev simplicity.

## Run and verify

```powershell
cd backend_v2
.\.venv\Scripts\Activate.ps1
python -m uvicorn app.main:app --reload
```

Open `http://127.0.0.1:8000/docs` and test `/health`.

## Day 1 done checklist

1. App starts with no errors.
2. `/health` returns status ok.
3. `users` table is created in PostgreSQL.
4. Config is read from `.env`.

## If stuck

1. DB connection error: verify `DATABASE_URL` format.
2. Import error: ensure package folders have `__init__.py`.
3. Pydantic settings error: check `.env` variable names exactly.
