export interface User {
  id: string;
  email: string;
  fullName: string;
  walletAddress: string;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: DocumentType;
  status: VerificationStatus;
  confidenceScore?: number;
  uploadedAt: string;
  txHash?: string;
  verifiedAt?: string;
}

export enum DocumentType {
  ID = 'Government ID',
  CERTIFICATE = 'Certificate',
  LICENSE = 'License',
  CUSTOM = 'Custom'
}

export enum VerificationStatus {
  PENDING = 'Pending',
  VERIFIED = 'Verified',
  FAILED = 'Failed'
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}