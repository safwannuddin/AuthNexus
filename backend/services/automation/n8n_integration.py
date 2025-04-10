import os
import json
import requests
from typing import Dict, Any, List, Optional
from fastapi import HTTPException

from core.config import get_settings

settings = get_settings()

class N8NAutomationService:
    """Service for integrating with n8n for workflow automation"""
    
    def __init__(self):
        self.webhook_url = settings.N8N_WEBHOOK_URL
        self.api_key = settings.N8N_API_KEY
        
    async def trigger_workflow(self, 
                             event_type: str, 
                             payload: Dict[str, Any]) -> Dict:
        """Trigger n8n workflow via webhook"""
        try:
            # Add event type to payload
            complete_payload = {
                "event_type": event_type,
                "data": payload
            }
            
            # Send to n8n webhook
            response = requests.post(
                self.webhook_url,
                json=complete_payload,
                headers={
                    "Content-Type": "application/json",
                    "X-API-KEY": self.api_key
                },
                timeout=5  # 5 second timeout
            )
            
            # Check response
            if response.status_code >= 400:
                print(f"n8n webhook error: {response.text}")
                return {
                    "status": "ERROR",
                    "message": f"Workflow trigger failed with status {response.status_code}",
                    "event_type": event_type
                }
                
            # Return success with any response data
            try:
                response_data = response.json()
            except:
                response_data = {"raw_response": response.text}
                
            return {
                "status": "SUCCESS",
                "event_type": event_type,
                "workflow_data": response_data
            }
            
        except Exception as e:
            print(f"n8n automation error: {str(e)}")
            return {
                "status": "ERROR",
                "message": f"Workflow trigger failed: {str(e)}",
                "event_type": event_type
            }
    
    async def handle_document_verification(self, verification_result: Dict) -> Dict:
        """Handle document verification workflow"""
        # The workflow might include:
        # 1. Notifying users
        # 2. Creating tickets for manual review if needed
        # 3. Updating user verification status
        # 4. Triggering additional processes
        
        return await self.trigger_workflow(
            event_type="document_verification",
            payload=verification_result
        )
    
    async def handle_user_signup(self, user_data: Dict) -> Dict:
        """Handle user signup workflow"""
        return await self.trigger_workflow(
            event_type="user_signup",
            payload=user_data
        )
    
    async def schedule_verification_reminder(self, 
                                          user_id: str, 
                                          due_date_iso: str) -> Dict:
        """Schedule a verification reminder"""
        return await self.trigger_workflow(
            event_type="schedule_reminder",
            payload={
                "user_id": user_id,
                "reminder_type": "verification",
                "due_date": due_date_iso  # ISO format date
            }
        )

# Export an instance for easy import
automation_service = N8NAutomationService()
