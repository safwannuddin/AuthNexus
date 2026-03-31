# Day 07 - Production Hardening

## Day goal

Add robust error handling, logging, and clean API response structure.

## What to learn today

1. Global exception handling
2. Structured logging
3. Response envelope consistency
4. Operational reliability basics

## Files to create/update today

1. `backend_v2/app/core/exceptions.py`
2. `backend_v2/app/core/logging.py`
3. `backend_v2/app/main.py`
4. `backend_v2/app/schemas/common.py`

## Step 1: custom exceptions

Create app-level exceptions such as:

1. `NotFoundException`
2. `ValidationException`
3. `UnauthorizedException`
4. `ConflictException`

## Step 2: global handlers in main.py

Add handlers so all errors become consistent JSON response.

Response shape example:

```json
{
  "success": false,
  "message": "User not found",
  "error_code": "USER_NOT_FOUND"
}
```

## Step 3: logging

Log:

1. request start/end
2. endpoint + method + status
3. key failures with trace id

Do not log:

1. passwords
2. raw tokens
3. sensitive document content

## Step 4: clean success response contract

Standardize success response shape too:

```json
{
  "success": true,
  "message": "Document verified",
  "data": {...}
}
```

## Day 7 done checklist

1. All major errors return clear JSON.
2. Logs are informative and safe.
3. API responses are consistent.
4. Backend is ready for staged production rollout.

## Final graduation checklist

1. Route files are thin.
2. Services contain business logic.
3. Repositories contain DB access.
4. Auth is complete (signup/login/protected routes).
5. Upload and verification flow works end-to-end.
6. Error handling and logging are production-grade baseline.

## Next phase after Day 7

1. Introduce Alembic migrations.
2. Add test suite with pytest + TestClient.
3. Add Redis/Celery for heavy async workloads.
4. Add blockchain write service adapter with retries.
