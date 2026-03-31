# AuthNexus Backend

This is the backend server for the AuthNexus document verification system.

## Setup Instructions

### 1. Install System Dependencies

#### Tesseract OCR
Tesseract OCR is required for document text extraction. Install it based on your operating system:

**Windows:**
1. Download the installer from [GitHub Tesseract Releases](https://github.com/UB-Mannheim/tesseract/wiki)
2. Run the installer and note the installation path
3. Add the installation path to your system PATH environment variable

**macOS:**
```bash
brew install tesseract
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install tesseract-ocr
```

**Linux (Fedora):**
```bash
sudo dnf install tesseract
```

### 2. Install Python Dependencies

1. Create a virtual environment:
```bash
python -m venv .venv
```

2. Activate the virtual environment:
   - Windows: `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`

3. Install the required packages:
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### 4. Run the Server

```bash
python -m uvicorn app.main:app --reload
```

The server will start at http://127.0.0.1:8000

## API Endpoints

### POST /api/verify-document

Verifies a document by extracting text and performing validation checks.

**Request Body:**
```json
{
  "document_type": "certificate",
  "document_data": "base64_encoded_image_data",
  "user_id": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Document verification completed",
  "verification_result": {
    "is_valid": true,
    "confidence": 0.8,
    "details": {
      "extracted_text": "...",
      "confidence_score": 0.8,
      "verification_date": "2023-04-27T12:00:00",
      "validation_checks": {
        "has_institution_name": true,
        "has_graduate_name": true,
        "has_issue_date": true,
        "has_degree_type": true
      }
    },
    "errors": []
  }
}
```

## Troubleshooting

### Tesseract OCR Issues

If you encounter errors related to Tesseract OCR:

1. Verify that Tesseract is installed correctly:
   ```bash
   tesseract --version
   ```

2. If using Windows, make sure the Tesseract installation path is in your system PATH.

3. You can specify the Tesseract path in your code:
   ```python
   import pytesseract
   pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
   ```

## Development

### Adding New Document Types

To add support for a new document type:

1. Create a new verification service class in `app/services/verification/`
2. Implement the `verify` method
3. Register the service in `app/main.py` 