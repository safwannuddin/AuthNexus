# Day 03 - Authentication and Authorization

## Day goal

Implement signup/login using bcrypt + JWT, then protect routes.

## What to learn today

1. Password hashing and verification
2. Access token generation
3. Auth dependency extraction from bearer token
4. Role checks (authorization)

## Files to create today

1. `backend_v2/app/core/security.py`
2. `backend_v2/app/schemas/auth.py`
3. `backend_v2/app/services/auth_service.py`
4. `backend_v2/app/api/routes/auth.py`
5. Update `backend_v2/app/api/deps.py`

## Step 1: security helpers

```python
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(subject: str, expires_minutes: int | None = None) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=expires_minutes or settings.jwt_access_token_expire_minutes
    )
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


def decode_access_token(token: str) -> dict:
    return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
```

## Step 2: auth schemas

```python
from pydantic import BaseModel, EmailStr


class SignupRequest(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
```

## Step 3: auth service

- Signup flow:
  - check duplicate email
  - hash password
  - create user
- Login flow:
  - find user by email
  - verify password
  - issue JWT

## Step 4: auth routes

- `POST /auth/signup`
- `POST /auth/login`

Keep route thin. Service owns business logic.

## Step 5: protect routes

Update deps with bearer token extraction (`OAuth2PasswordBearer`) and current user resolver.

Add role checker helper:

```python
def require_role(required_role: str):
    def checker(current_user = Depends(get_current_user)):
        if current_user.role != required_role:
            raise HTTPException(status_code=403, detail="Forbidden")
        return current_user
    return checker
```

## Day 3 done checklist

1. Signup creates user with hashed password.
2. Login returns JWT token.
3. Protected route rejects missing/invalid token.
4. Role-protected route returns 403 for wrong role.

## Security mistakes to avoid

1. Never return hashed_password in API responses.
2. Never store plain password.
3. Never hardcode JWT secret in source code.
