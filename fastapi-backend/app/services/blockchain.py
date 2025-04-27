from web3 import Web3
from ..core.config import settings
import json

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(settings.POLYGON_RPC_URL))

async def store_on_blockchain(document_id: str, verification_result: dict) -> str:
    """
    Store document verification result on Polygon blockchain
    """
    try:
        # Load contract ABI (you'll need to replace this with your actual contract ABI)
        contract_abi = []  # Add your contract ABI here
        
        # Initialize contract
        contract = w3.eth.contract(
            address=settings.CONTRACT_ADDRESS,
            abi=contract_abi
        )
        
        # Prepare transaction
        tx = contract.functions.storeVerification(
            document_id,
            verification_result["is_valid"],
            json.dumps(verification_result["details"])
        ).build_transaction({
            'from': w3.eth.accounts[0],  # You'll need to set up proper account management
            'nonce': w3.eth.get_transaction_count(w3.eth.accounts[0])
        })
        
        # Sign and send transaction
        signed_tx = w3.eth.account.sign_transaction(tx, private_key="YOUR_PRIVATE_KEY")  # Add proper key management
        tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        return tx_hash.hex()
        
    except Exception as e:
        raise Exception(f"Failed to store on blockchain: {str(e)}") 