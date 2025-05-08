import { ethers } from 'ethers';
import { DocumentVerification } from '../artifacts/contracts/DocumentVerification.sol/DocumentVerification.json';

export class BlockchainService {
    private contract: ethers.Contract;
    private provider: ethers.providers.Web3Provider;
    
    constructor() {
        // Connect to Polygon network
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = this.provider.getSigner();
        
        // Initialize contract
        this.contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS!,
            DocumentVerification.abi,
            signer
        );
    }
    
    async connectWallet(): Promise<string> {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const signer = this.provider.getSigner();
            return await signer.getAddress();
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        }
    }
    
    async storeVerification(
        documentHash: string,
        isValid: boolean,
        verificationDetails: string
    ): Promise<boolean> {
        try {
            const tx = await this.contract.verifyDocument(
                documentHash,
                isValid,
                verificationDetails
            );
            await tx.wait();
            return true;
        } catch (error) {
            console.error('Blockchain storage failed:', error);
            return false;
        }
    }
    
    async getDocument(documentHash: string) {
        try {
            return await this.contract.getDocument(documentHash);
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    }
    
    async getUserDocuments(address: string) {
        try {
            return await this.contract.getUserDocuments(address);
        } catch (error) {
            console.error('Error fetching user documents:', error);
            throw error;
        }
    }
} 