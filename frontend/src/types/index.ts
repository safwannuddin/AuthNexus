export type VerificationMethod = 'DOCUMENT' | 'BIOMETRIC' | 'SELFIE';

export interface VerificationRecord {
  id: string;
  user_id: string;
  method: VerificationMethod;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}