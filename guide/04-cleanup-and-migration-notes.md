# 04 - Cleanup and Migration Notes

This file documents what was changed in the repository structure.

## New top-level structure

- `frontend/`
- `old_backend/`
- `blockchain/`
- `guide/`

## Why this split helps

1. Frontend learning and backend learning are isolated.
2. Legacy backend is preserved for reference.
3. Blockchain work is isolated from API work.
4. Guides are centralized and discoverable.

## Current recommendation

1. Keep `old_backend/fastapi-backend` untouched as historical reference.
2. Build all new backend work in `backend_v2/`.
3. Migrate endpoint by endpoint from old backend to backend_v2.
4. Delete old backend only after parity tests pass.

## Suggested migration order

1. Health/config setup
2. User/auth endpoints
3. Document upload and list
4. Verification flow
5. Blockchain adapter

## Immediate next implementation action

Create `backend_v2/` and start with `guide/day-01.md`.
