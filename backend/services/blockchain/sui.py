import os
import json
import time
import hashlib
from typing import Dict, Any, Optional
import requests
from pysui.sui.sui_builders.exec_builders import MoveCallTransaction
from pysui import SuiClient, SuiConfig
from fastapi import HTTPException

from core.config import get_settings

settings = get_settings()

class SuiBlockchainService:
    """Service for interacting with Sui blockchain for document verification logging"""
    
    def __init__(self):
        # Initialize Sui client
        try:
            # Create Sui config
            self.sui_config = SuiConfig.user_config(
                rpc_url=settings.SUI_RPC_URL,
                prv_keys=[settings.SUI_PRIVATE_KEY]
            )
            self.client = SuiClient(self.sui_config)
            self.package_id = settings.SUI_PACKAGE_ID
            
        except Exception as e:
            print(f"Failed to initialize Sui client: {e}")
            # Fallback to a basic implementation if SUI setup fails
            self.client = None
    
    def _generate_document_hash(self, document_data: Dict) -> str:
        """Generate a secure hash of document data for blockchain storage"""
        # Create a stable representation of the document data
        doc_json = json.dumps(document_data, sort_keys=True)
        # Generate SHA-256 hash
        return hashlib.sha256(doc_json.encode()).hexdigest()
    
    async def log_verification(self, 
                             verification_id: str, 
                             document_data: Dict,
                             verification_result: Dict) -> Dict:
        """Log document verification to the Sui blockchain"""
        if not self.client:
            # Fallback if blockchain integration is not available
            return {
                "status": "SIMULATED", 
                "message": "Blockchain logging simulated (client not available)",
                "timestamp": int(time.time()),
                "verification_id": verification_id
            }
            
        try:
            # Generate document hash (only hash is stored on-chain for privacy)
            doc_hash = self._generate_document_hash(document_data)
            
            # Prepare verification status
            status = verification_result.get("status", "UNKNOWN")
            confidence = str(int(verification_result.get("confidence", 0) * 100))
            timestamp = int(time.time())
            
            # Create move call to record verification
            move_call = MoveCallTransaction()
            tx_block = move_call.move_call(
                signer=self.sui_config.active_address,
                package_object_id=self.package_id,
                module="document_verification",
                function="record_verification",
                arguments=[
                    verification_id,
                    doc_hash, 
                    status,
                    confidence,
                    str(timestamp)
                ],
                type_arguments=[]
            )
            
            # Execute the transaction
            result = self.client.execute_transaction_block(tx_block)
            
            # Process result
            tx_digest = result.result_data.digest
            
            return {
                "status": "SUCCESS",
                "blockchain": "sui",
                "transaction_hash": tx_digest,
                "timestamp": timestamp,
                "verification_id": verification_id,
                "document_hash": doc_hash
            }
            
        except Exception as e:
            # Log the error but don't expose details in the response
            print(f"Blockchain logging error: {e}")
            
            # For development, we'll return the error
            # In production, you might want to handle this differently
            return {
                "status": "ERROR",
                "message": f"Failed to log to blockchain: {str(e)}",
                "verification_id": verification_id
            }
    
    async def verify_on_chain(self, verification_id: str) -> Dict:
        """Verify that a document verification exists on-chain"""
        if not self.client:
            raise HTTPException(
                status_code=503,
                detail="Blockchain verification unavailable"
            )
            
        try:
            # Query the blockchain for the verification record
            query_result = await self.client.suix_getDynamicFields(
                parent_object_id=self.package_id,
                limit=100
            )
            
            # Parse and find the verification record
            for field in query_result:
                if field.name.value == verification_id:
                    # Found the verification
                    object_id = field.object_id
                    
                    # Get the object details
                    object_data = await self.client.suix_getObject(
                        object_id=object_id
                    )
                    
                    return {
                        "status": "VERIFIED",
                        "blockchain_data": object_data.data,
                        "verification_id": verification_id
                    }
            
            # If we get here, verification was not found
            return {
                "status": "NOT_FOUND",
                "verification_id": verification_id
            }
            
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Blockchain verification failed: {str(e)}"
            )

# Export an instance for easy import
blockchain_service = SuiBlockchainService()
