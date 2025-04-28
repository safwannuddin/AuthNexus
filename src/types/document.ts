export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed'
}

export enum VerificationStep {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  SENDING_API = 'sending_api',
  COMPLETED = 'completed'
}

export interface VerificationDetails {
  validation_checks?: Record<string, boolean>;
  extracted_text?: string;
  error_message?: string;
  [key: string]: unknown;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  status: VerificationStatus;
  file_path: string;
  created_at: string;
  verified_at?: string;
  current_step: VerificationStep;
  verification_result?: {
    is_valid: boolean;
    confidence_score?: number;
    details?: VerificationDetails;
    errors?: string[];
  };
} 