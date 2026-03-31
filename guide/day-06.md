# Day 06 - Background Tasks + Async vs Sync

## Day goal

Move verification to background processing so upload is fast and non-blocking.

## What to learn today

1. FastAPI `BackgroundTasks`
2. Async route behavior
3. Sync CPU-bound task boundaries
4. Status polling pattern

## Files to update today

1. `backend_v2/app/api/routes/documents.py`
2. `backend_v2/app/services/document_service.py`
3. `backend_v2/app/services/verification_service.py`

## Design pattern

- Upload endpoint should return quickly with status `pending`.
- Heavy verification should run in a background task.
- Frontend should poll `GET /documents/{id}` for status updates.

## Example flow

1. User uploads file.
2. API stores metadata with `pending`.
3. Background task runs verification.
4. DB status becomes `verified` or `failed`.
5. Frontend reads latest status.

## Async vs sync practical rule

1. Route functions can be async.
2. DB and CPU-heavy OCR may remain sync initially.
3. Never block event loop with heavy CPU tasks inside async without planning.

## Day 6 done checklist

1. Upload endpoint returns quickly.
2. Background verification updates DB correctly.
3. Status endpoint reflects transitions.

## Common mistakes

1. Doing heavy OCR directly before response.
2. Not saving intermediate failure states.
3. Not logging background task failures.
