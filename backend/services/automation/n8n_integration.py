import requests
import json
from fastapi import HTTPException
from typing import Dict, Any

from core.config import get_settings

settings = get_settings()

class N8nService:
    """Service to interact with n8n for workflow automation."""
    
    def __init__(self):
        """Initialize the n8n service."""
        self.webhook_url = settings.N8N_WEBHOOK_URL
        self.api_key = settings.N8N_API_KEY
    
    async def trigger_workflow(self, 
                             event_type: str, 
                             data: Dict[str, Any]) -> bool:
        """
        Trigger an n8n workflow via webhook.
        
        Args:
            event_type: Type of event (document_verified, document_rejected, etc.)
            data: Data to send with the webhook
        
        Returns:
            bool: Success status
        """
        try:
            # Prepare payload
            payload = {
                "event_type": event_type,
                "data": data
            }
            
            # Add authentication
            headers = {
                "Content-Type": "application/json",
                "X-N8N-API-KEY": self.api_key
            }
            
            # Send request to n8n webhook
            response = requests.post(
                self.webhook_url,
                json=payload,
                headers=headers
            )
            
            # Check if request was successful
            if response.status_code == 200:
                return True
            else:
                print(f"n8n webhook failed: {response.status_code} - {response.text}")
                return False
                
        except Exception as e:
            print(f"Error triggering n8n workflow: {e}")
            return False
    
    async def notify_document_verification(self, 
                                         document_id: str, 
                                         verification_id: str, 
                                         status: str,
                                         metadata: Dict[str, Any]) -> bool:
        """Send a notification about document verification status."""
        return await self.trigger_workflow(
            event_type="document_verification",
            data={
                "document_id": document_id,
                "verification_id": verification_id,
                "status": status,
                "timestamp": metadata.get("verification_timestamp"),
                "confidence_score": metadata.get("ocr", {}).get("confidence"),
                "blockchain_tx_hash": metadata.get("blockchain_tx_hash")
            }
        )
    
    async def notify_security_alert(self, 
                                  alert_type: str, 
                                  severity: str,
                                  details: Dict[str, Any]) -> bool:
        """Send a security alert notification."""
        return await self.trigger_workflow(
            event_type="security_alert",
            data={
                "alert_type": alert_type,
                "severity": severity,
                "details": details,
                "timestamp": details.get("timestamp")
            }
        )

# Create singleton instance
automation_service = N8nService()
