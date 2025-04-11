try:
    from pysui import SuiClient
    from pysui.sui.sui_builders.get_builders import GetTx
    from pysui.sui.sui_builders.transaction_builder import ProgrammableTransaction
    from pysui.sui.sui_clients.sync_client import SuiClient
    PYSUI_AVAILABLE = True
except ImportError:
    PYSUI_AVAILABLE = False
    print("WARNING: pysui package not available. Blockchain features will be disabled.")

from fastapi import HTTPException
import json
import hashlib
import time
from typing import Dict, Any

from core.config import get_settings

settings = get_settings()

class SuiBlockchainService:
    """Service to interact with the Sui blockchain."""

    def __init__(self):
        """Initialize the Sui blockchain service."""
        self.rpc_url = settings.SUI_RPC_URL
        self.package_id = settings.SUI_PACKAGE_ID
        self.private_key = settings.SUI_PRIVATE_KEY
        self.client = None

        if PYSUI_AVAILABLE:
            try:
                # Configure SuiClient
                self.client = SuiClient(self.rpc_url)
            except Exception as e:
                print(f"Error initializing Sui client: {e}")
                self.client = None

    def _generate_document_hash(self, verification_data: Dict[str, Any]) -> str:
        """Generate a hash for the document verification data."""
        data_bytes = json.dumps(verification_data, sort_keys=True).encode('utf-8')
        return hashlib.sha256(data_bytes).hexdigest()

    async def anchor_verification(self, verification_id: str, document_id: str, verification_data: Dict[str, Any]) -> str:
        """
        Anchor verification data to the Sui blockchain.
        Returns the transaction hash.
        """
        document_hash = self._generate_document_hash(verification_data)

        if not PYSUI_AVAILABLE or not self.client:
            print("WARNING: Using mock blockchain transaction for development")
            mock_tx_hash = hashlib.sha256(f"{verification_id}:{document_id}:{document_hash}:{time.time()}".encode()).hexdigest()
            return f"mock_tx_{mock_tx_hash[:16]}"

        try:
            tx = ProgrammableTransaction()

            tx.move_call(
                target=f"{self.package_id}::verification::record_verification",
                arguments=[
                    tx.pure(verification_id),
                    tx.pure(document_id),
                    tx.pure(document_hash),
                    tx.pure(json.dumps(verification_data.get("status", "VERIFIED"))),
                ],
                type_arguments=[],
            )

            response = self.client.execute_transaction(
                tx, sender=self.private_key, max_gas=10000
            )

            if response and hasattr(response, "effects") and response.effects.status.status == "success":
                return response.digest
            else:
                error_detail = "Unknown error"
                if hasattr(response, "effects") and hasattr(response.effects, "status"):
                    error_detail = getattr(response.effects.status, "error", "Unknown error")
                raise HTTPException(status_code=500, detail=f"Transaction failed: {error_detail}")

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Blockchain anchoring failed: {str(e)}")

    async def retrieve_verification(self, transaction_hash: str) -> Dict[str, Any]:
        """
        Retrieve verification data from the blockchain using transaction hash.
        """
        if transaction_hash.startswith("mock_tx_") or not PYSUI_AVAILABLE or not self.client:
            print("WARNING: Using mock verification data for development")
            return {
                "verification_id": "mock_verification_id",
                "document_id": "mock_document_id",
                "document_hash": hashlib.sha256(transaction_hash.encode()).hexdigest(),
                "status": "VERIFIED",
                "transaction_hash": transaction_hash,
                "timestamp": time.time()
            }

        try:
            get_tx = GetTx(digest=transaction_hash)
            response = self.client.execute(get_tx)

            if not response or not hasattr(response, "transaction"):
                raise HTTPException(status_code=404, detail="Transaction not found")

            transaction = response.transaction

            if hasattr(transaction, "data") and hasattr(transaction.data, "transactions"):
                for tx in transaction.data.transactions:
                    if hasattr(tx, "MoveCall") and tx.MoveCall.function == "record_verification":
                        args = tx.MoveCall.arguments
                        return {
                            "verification_id": args[0].value,
                            "document_id": args[1].value,
                            "document_hash": args[2].value,
                            "status": args[3].value,
                            "transaction_hash": transaction_hash,
                            "timestamp": transaction.timestamp_ms / 1000
                        }

            raise HTTPException(status_code=404, detail="Verification data not found in transaction")

        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to retrieve verification: {str(e)}")


# Create singleton instance
blockchain_service = SuiBlockchainService()
