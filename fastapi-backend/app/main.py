from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from pydantic import BaseModel
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Define request model
class DocumentVerificationRequest(BaseModel):
    document_type: str
    document_data: str
    user_id: str

app = FastAPI(
    title="AuthNexus Backend",
    description="Document verification and authentication system",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return FileResponse("static/index.html")

@app.post("/api/verify-document")
async def verify_document(request: DocumentVerificationRequest):
    try:
        logger.info(f"Received verification request for document type: {request.document_type}")
        logger.info(f"User ID: {request.user_id}")
        logger.info(f"Document data length: {len(request.document_data)} bytes")

        # For testing, we'll just return a mock response
        response = {
            "status": "success",
            "message": "Document verified successfully",
            "verification_result": {
                "is_valid": True,
                "document_type": request.document_type,
                "user_id": request.user_id,
                "verification_date": "2024-03-20"
            }
        }

        logger.info(f"Sending response: {response}")
        return response
    except Exception as e:
        logger.error(f"Error processing verification request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 