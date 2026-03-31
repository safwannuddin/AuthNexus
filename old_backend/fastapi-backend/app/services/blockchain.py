import os
import json
import logging
from typing import Dict, Any
from dotenv import load_dotenv
from web3 import Web3

# Configure logging
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Get contract address from environment
CONTRACT_ADDRESS = os.getenv('CONTRACT_ADDRESS', '0xE11b2A9E3d7412664bF017D160ecBfD76404E4aB')
RPC_URL = os.getenv('POLYGON_AMOY_RPC_URL', 'https://rpc-amoy.polygon.technology/')

# ABI for DocumentVerification contract
CONTRACT_ABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "documentHash",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isValid",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "verificationDetails",
                "type": "string"
            }
        ],
        "name": "verifyDocument",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "documents",
        "outputs": [
            {
                "internalType": "string",
                "name": "documentHash",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isValid",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "verificationDetails",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

class BlockchainService:
    def __init__(self):
        try:
            # Connect to the blockchain
            self.web3 = Web3(Web3.HTTPProvider(RPC_URL))
            if not self.web3.is_connected():
                logger.warning(f"Failed to connect to Polygon at {RPC_URL}, using mock mode")
                self.mock_mode = True
            else:
                # Initialize contract
                self.contract = self.web3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
                self.mock_mode = False
                logger.info(f"Connected to Polygon at {RPC_URL}")
        except Exception as e:
            logger.error(f"Error initializing blockchain service: {str(e)}")
            self.mock_mode = True
    
    async def store_verification_result(self, document_hash: str, is_valid: bool, verification_details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Store document verification result on the blockchain
        """
        try:
            if self.mock_mode:
                logger.info(f"[MOCK] Storing verification result for document: {document_hash}")
                return {
                    "success": True,
                    "transaction_hash": "0x" + "0" * 64,
                    "timestamp": 0,
                    "mock": True
                }
            
            # Convert verification details to JSON string
            verification_details_str = json.dumps(verification_details)
            
            # Get private key from environment
            private_key = os.getenv('PRIVATE_KEY')
            if not private_key:
                logger.warning("Private key not found, using mock mode")
                return {
                    "success": True,
                    "transaction_hash": "0x" + "0" * 64,
                    "timestamp": 0,
                    "mock": True
                }
            
            # Call the contract
            # For now, we'll just log the intent since we don't have a wallet setup
            logger.info(f"Would store verification result for document: {document_hash}")
            return {
                "success": True,
                "transaction_hash": "0x" + "0" * 64,
                "timestamp": 0,
                "mock": True,
                "message": "Actual blockchain integration disabled for demo"
            }
            
        except Exception as e:
            logger.error(f"Error storing verification result: {str(e)}")
            return {
                "success": False,
                "error": str(e)
            } 