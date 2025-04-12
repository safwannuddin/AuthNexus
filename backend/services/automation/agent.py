"""
AuthNexus Automation Agent
This module provides the central automation agent that coordinates
various workflows and automation tasks in the AuthNexus system.
"""
import asyncio
import logging
from datetime import datetime
from typing import Dict, Any, List, Optional

from .n8n_integration import automation_service
from services.ai.document_verification import DocumentVerificationService
from services.blockchain.sui import SuiBlockchainService
from services.storage.supabase import SupabaseStorageService

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AutomationAgent:
    """
    Central automation agent that orchestrates workflows and processes
    for the AuthNexus system.
    """
    
    def __init__(self):
        """Initialize the automation agent with required services."""
        self.n8n_service = automation_service
        self.storage_service = SupabaseStorageService()
        self.blockchain_service = SuiBlockchainService()
        self.verification_service = DocumentVerificationService()
        self.active_workflows = {}
        
    async def handle_document_uploaded(self, document_id: str, user_id: str, 
                                     document_type: str, file_path: str) -> Dict[str, Any]:
        """
        Handles the complete workflow when a new document is uploaded.
        
        Args:
            document_id: Identifier for the document
            user_id: User who uploaded the document
            document_type: Type of document (passport, ID card, etc)
            file_path: Path to the uploaded file in storage
            
        Returns:
            Dict with status and process information
        """
        logger.info(f"Starting document processing workflow for document {document_id}")
        
        try:
            # Step 1: Trigger AI verification
            verification_result = await self.verification_service.verify_document(
                document_id=document_id,
                document_type=document_type,
                file_path=file_path
            )
            
            # Step 2: If verification passes confidence threshold, anchor to blockchain
            blockchain_tx = None
            if verification_result.get("status") == "VERIFIED" and verification_result.get("confidence", 0) >= 0.85:
                # Create document hash
                document_hash = self.blockchain_service.create_document_hash(
                    document_id=document_id,
                    verification_id=verification_result.get("verification_id")
                )
                
                # Anchor to blockchain
                blockchain_tx = await self.blockchain_service.anchor_document(
                    document_hash=document_hash,
                    metadata={
                        "document_id": document_id,
                        "verification_id": verification_result.get("verification_id"),
                        "timestamp": datetime.utcnow().isoformat()
                    }
                )
            
            # Step 3: Notify about the verification completion
            metadata = {
                "verification_timestamp": datetime.utcnow().isoformat(),
                "ocr": {
                    "confidence": verification_result.get("confidence", 0)
                },
                "blockchain_tx_hash": blockchain_tx.get("tx_hash") if blockchain_tx else None
            }
            
            await self.n8n_service.notify_document_verification(
                document_id=document_id,
                verification_id=verification_result.get("verification_id"),
                status=verification_result.get("status"),
                metadata=metadata
            )
            
            return {
                "status": "completed",
                "document_id": document_id,
                "verification_status": verification_result.get("status"),
                "blockchain_anchored": blockchain_tx is not None,
                "process_id": verification_result.get("verification_id")
            }
            
        except Exception as e:
            logger.error(f"Document processing workflow failed: {e}")
            # Notify about failure
            await self.n8n_service.notify_security_alert(
                alert_type="workflow_failure",
                severity="high",
                details={
                    "document_id": document_id,
                    "error": str(e),
                    "timestamp": datetime.utcnow().isoformat()
                }
            )
            return {
                "status": "failed",
                "document_id": document_id,
                "error": str(e)
            }
    
    async def schedule_periodic_verification(self, document_ids: List[str], 
                                          interval_hours: int = 24,
                                          max_runs: Optional[int] = None) -> str:
        """
        Schedule periodic re-verification of documents.
        
        Args:
            document_ids: List of document IDs to verify
            interval_hours: How often to verify (in hours)
            max_runs: Maximum number of verification runs (None for indefinite)
            
        Returns:
            Workflow ID string
        """
        workflow_id = f"periodic_verify_{datetime.utcnow().timestamp()}"
        
        # Store workflow info
        self.active_workflows[workflow_id] = {
            "type": "periodic_verification",
            "document_ids": document_ids,
            "interval_hours": interval_hours,
            "max_runs": max_runs,
            "current_runs": 0,
            "last_run": None,
            "status": "scheduled"
        }
        
        # Start the periodic task
        asyncio.create_task(
            self._run_periodic_verification(workflow_id)
        )
        
        return workflow_id
    
    async def _run_periodic_verification(self, workflow_id: str):
        """Internal method to run periodic verification."""
        workflow = self.active_workflows.get(workflow_id)
        if not workflow:
            return
            
        while True:
            try:
                # Check if we've reached max runs
                if workflow["max_runs"] and workflow["current_runs"] >= workflow["max_runs"]:
                    workflow["status"] = "completed"
                    break
                    
                # Process each document
                for doc_id in workflow["document_ids"]:
                    # Get document info (would need to implement this)
                    doc_info = await self._get_document_info(doc_id)
                    
                    # Re-verify
                    if doc_info:
                        await self.handle_document_uploaded(
                            document_id=doc_id,
                            user_id=doc_info["user_id"],
                            document_type=doc_info["document_type"],
                            file_path=doc_info["file_path"]
                        )
                
                # Update workflow status
                workflow["current_runs"] += 1
                workflow["last_run"] = datetime.utcnow().isoformat()
                workflow["status"] = "running"
                
                # Wait for next interval
                await asyncio.sleep(workflow["interval_hours"] * 3600)
                
            except Exception as e:
                logger.error(f"Periodic verification error: {e}")
                workflow["status"] = "error"
                workflow["error"] = str(e)
                break
    
    async def _get_document_info(self, document_id: str) -> Dict[str, Any]:
        """Helper to get document information."""
        # This would need to be implemented, possibly with a DB call
        # For now returning a mock
        return {
            "user_id": "mock_user",
            "document_type": "passport",
            "file_path": f"documents/{document_id}.pdf"
        }
    
    def cancel_workflow(self, workflow_id: str) -> bool:
        """Cancel an active workflow."""
        if workflow_id in self.active_workflows:
            self.active_workflows[workflow_id]["status"] = "cancelled"
            return True
        return False
        
    async def send_scheduled_reports(self, user_id: str, 
                                   report_type: str, 
                                   schedule: Dict[str, Any]) -> str:
        """
        Schedule automated reports to be sent to users.
        
        Args:
            user_id: User to receive reports
            report_type: Type of report (verification, activity, etc)
            schedule: Dict with schedule information (frequency, time, etc)
            
        Returns:
            Workflow ID for the scheduled report
        """
        # Implementation would be similar to periodic verification
        # but generating and sending reports instead
        workflow_id = f"scheduled_report_{datetime.utcnow().timestamp()}"
        
        # Would implement the actual scheduling logic here
        
        return workflow_id

# Create singleton instance
automation_agent = AutomationAgent()
