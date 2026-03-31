# Day 02 - Users CRUD + Layered Architecture

## Day goal

Implement users CRUD with strict layer separation:

Route -> Service -> Repository -> DB

## What to learn today

1. Dependency injection with `Depends`
2. Repository pattern
3. Service orchestration
4. Clean route design

## Files to create today

1. `backend_v2/app/db/repositories/user_repository.py`
2. `backend_v2/app/services/user_service.py`
3. `backend_v2/app/api/deps.py`
4. `backend_v2/app/api/routes/users.py`
5. Update `backend_v2/app/main.py`

## Step 1: user repository

```python
from sqlalchemy.orm import Session

from app.db.models.user import User
from app.schemas.user import UserCreate


class UserRepository:
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> User | None:
        return db.query(User).filter(User.id == user_id).first()

    @staticmethod
    def get_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def list_all(db: Session) -> list[User]:
        return db.query(User).order_by(User.id.desc()).all()

    @staticmethod
    def create(db: Session, payload: UserCreate, hashed_password: str) -> User:
        user = User(
            email=payload.email,
            full_name=payload.full_name,
            hashed_password=hashed_password,
            role="user",
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
```

## Step 2: user service

```python
from sqlalchemy.orm import Session

from app.db.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class UserService:
    @staticmethod
    def list_users(db: Session):
        return UserRepository.list_all(db)

    @staticmethod
    def get_user(db: Session, user_id: int):
        return UserRepository.get_by_id(db, user_id)

    @staticmethod
    def create_user(db: Session, payload: UserCreate, hashed_password: str):
        existing = UserRepository.get_by_email(db, payload.email)
        if existing:
            raise ValueError("Email already exists")
        return UserRepository.create(db, payload, hashed_password)
```

## Step 3: deps

```python
from app.db.database import get_db

__all__ = ["get_db"]
```

## Step 4: users routes

```python
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.schemas.user import UserRead
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=list[UserRead])
def list_users(db: Session = Depends(get_db)):
    return UserService.list_users(db)


@router.get("/{user_id}", response_model=UserRead)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = UserService.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
```

## Step 5: register router in main.py

```python
from app.api.routes.users import router as users_router
app.include_router(users_router)
```

## Day 2 done checklist

1. `GET /users` works.
2. `GET /users/{id}` returns 404 for missing user.
3. No SQL appears in route file.

## Strict quality checks

1. Route files must never call `db.query` directly.
2. Service files must never parse HTTP request objects.
3. Repository should not return HTTP exceptions.
