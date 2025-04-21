export interface User {
  id: string;
  email: string;
  fullName: string;
  walletAddress: string;
}

export interface Document {
  id: string;
  user_id: string;
  name: string;
  type: DocumentType;
  status: VerificationStatus;
  confidence_score?: number;
  uploaded_at: string;
  verified_at?: string;
  file_url: string;
  file_path: string;
  tx_hash?: string;
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