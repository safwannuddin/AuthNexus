# Day 05 - AI Verification Service Integration

## Day goal

Integrate AI verification into service layer cleanly.

## What to learn today

1. Service orchestration for multi-step processing
2. Stable response contracts for AI outputs
3. Separation between transport layer and AI logic

## Files to create/update today

1. `backend_v2/app/services/verification_service.py`
2. `backend_v2/app/services/document_service.py` (update)
3. `backend_v2/app/schemas/common.py`
4. `backend_v2/app/api/routes/documents.py` (verify endpoint)

## Architecture rule

1. Route receives request.
2. Route calls document service.
3. Document service calls verification service.
4. Verification service handles OCR/AI and returns normalized result.

## Verification contract (must be consistent)

Use one shape everywhere:

```json
{
  "is_valid": true,
  "confidence": 0.87,
  "details": {
    "extracted_text": "...",
    "checks": {"has_name": true, "has_id_number": true},
    "errors": []
  }
}
```

## Endpoint to add

`POST /documents/{document_id}/verify`

Flow:

1. Load document by id and owner.
2. Read file bytes.
3. Run verification service.
4. Update document status and verification result.
5. Return normalized response.

## Day 5 done checklist

1. Verification endpoint updates DB status.
2. Failed verification writes meaningful error details.
3. Response format is predictable and frontend-friendly.

## Strict design corrections

1. Do not call OCR libraries from route files.
2. Do not leak low-level library exceptions directly to clients.
3. Normalize AI output in service before returning it.
