import { BrowserProvider, Contract, JsonRpcSigner } from 'ethers';
import DocumentVerification from '../artifacts/contracts/DocumentVerification.sol/DocumentVerification.json';

interface EthereumProvider {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
}

declare global {
    interface Window {
        ethereum: EthereumProvider;
    }
}

export class BlockchainService {
    private contract: Contract;
    private provider: BrowserProvider;
    private signer: JsonRpcSigner | null = null;
    
    constructor() {
        // Connect to Polygon network
        this.provider = new BrowserProvider(window.ethereum);
    }
    
    async initialize() {
        this.signer = await this.provider.getSigner();
        this.contract = new Contract(
            process.env.CONTRACT_ADDRESS!,
            DocumentVerification.abi,
            this.signer
        );
    }
    
    async connectWallet(): Promise<string> {
        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            await this.initialize();
            return await this.signer!.getAddress();
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
            if (!this.signer) {
                throw new Error('Wallet not connected');
            }
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
            if (!this.signer) {
                throw new Error('Wallet not connected');
            }
            return await this.contract.getDocument(documentHash);
        } catch (error) {
            console.error('Error fetching document:', error);
            throw error;
        }
    }
    
    async getUserDocuments(address: string) {
        try {
            if (!this.signer) {
                throw new Error('Wallet not connected');
            }
            return await this.contract.getUserDocuments(address);
        } catch (error) {
            console.error('Error fetching user documents:', error);
            throw error;
        }
    }
} 