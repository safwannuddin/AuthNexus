# 01 - Project Map

This file explains exactly what each top-level folder is for.

## Top-level structure

- `frontend/`
: User interface (React + Vite). Keep as-is while learning backend.

- `old_backend/fastapi-backend/`
: Your original FastAPI prototype. Use this as a reference for existing flows.

- `blockchain/`
: Solidity contracts, deployment scripts, Hardhat config, build artifacts.

- `guide/`
: Learning plan and implementation instructions.

## What you will build

You will create a **new backend** beside old prototype:

- `backend_v2/`

Inside `backend_v2/` you will use this architecture:

- `app/main.py`
: FastAPI app creation, middleware, router registration.

- `app/core/`
: Settings, security helpers, logging, global exception handling.

- `app/db/database.py`
: SQLAlchemy engine/session/base and DB dependency.

- `app/db/models/`
: ORM models only (User, Document).

- `app/db/repositories/`
: DB query logic only.

- `app/schemas/`
: Pydantic request/response models only.

- `app/api/routes/`
: HTTP endpoints only. No business logic.

- `app/services/`
: Business logic orchestration.

- `app/utils/`
: Utility modules (file handling, hashing, helpers).

## Current prototype pain points to avoid in v2

1. Route and business logic mixed in one file.
2. Multiple parallel flows for similar features.
3. Mock behavior in production paths.
4. Inconsistent data contracts and response shapes.

## Your development philosophy

1. First make it clean.
2. Then make it work.
3. Then make it scalable.
4. Then optimize.
