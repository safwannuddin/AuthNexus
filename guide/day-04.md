# Day 04 - Document Upload + Persistence

## Day goal

Create document upload API, store file locally, and save metadata in DB.

## What to learn today

1. File uploads with `UploadFile`
2. Multipart form handling
3. Local storage helper design
4. User-document relationship in DB

## Files to create today

1. `backend_v2/app/db/models/document.py`
2. `backend_v2/app/schemas/document.py`
3. `backend_v2/app/db/repositories/document_repository.py`
4. `backend_v2/app/utils/file_storage.py`
5. `backend_v2/app/services/document_service.py`
6. `backend_v2/app/api/routes/documents.py`

## Step 1: Document model

Fields:

1. `id`
2. `owner_id` (FK -> users.id)
3. `document_type`
4. `status` (`pending`, `verified`, `failed`)
5. `file_path`
6. `uploaded_at`
7. `verified_at` optional
8. `verification_result` optional JSON/text

## Step 2: document schemas

Create:

1. `DocumentCreateResponse`
2. `DocumentRead`
3. `DocumentVerifyResponse`

Use `model_config = {"from_attributes": True}` for response models.

## Step 3: local storage utility

`app/utils/file_storage.py`

Responsibilities:

1. Ensure upload folder exists.
2. Generate unique safe filename.
3. Save uploaded bytes to disk.
4. Return absolute/relative path.

## Step 4: document service

Flow:

1. Validate file extension.
2. Save file with utility helper.
3. Create DB record with `pending` status.
4. Return document metadata.

## Step 5: document routes

Add endpoints:

1. `POST /documents/upload`
2. `GET /documents`
3. `GET /documents/{document_id}`

All endpoints require authenticated user.

## Day 4 done checklist

1. Upload endpoint works with PDF/JPG/PNG.
2. File appears in local upload directory.
3. DB document record is created with owner relation.
4. User can list only own documents.

## Strict quality checks

1. No direct file-save logic inside route.
2. No direct SQL in route.
3. Validate MIME/type before saving.
