export interface User {
  id: string;
  email: string;
  fullName: string;
  walletAddress: string;
}

export interface VerificationResult {
  is_valid: boolean;
  document_type: string;
  user_id: string;
  verification_date: string;
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
  verification_result?: VerificationResult;
}

export enum DocumentType {
  ID = 'id_card',
  CERTIFICATE = 'certificate',
  LICENSE = 'drivers_license',
  CUSTOM = 'custom'
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