import { supabase } from './supabase';

export interface VerificationResult {
  id: string;
  status: 'pending' | 'verified' | 'rejected';
  confidence_score?: number;
  metadata?: Record<string, any>;
  blockchain_reference?: string;
  verification_date: string;
}

export async function initiateVerification(documentId: string) {
  try {
    const response = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ documentId })
    });

    if (!response.ok) {
      throw new Error('Verification initiation failed');
    }

    const data = await response.json();
    return data as VerificationResult;
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}

export async function checkVerificationStatus(documentId: string): Promise<VerificationResult> {
  try {
    const { data, error } = await supabase
      .from('verifications')
      .select('*')
      .eq('document_id', documentId)
      .single();

    if (error) throw error;

    return {
      id: data.id,
      status: data.status,
      confidence_score: data.confidence_score,
      metadata: data.metadata,
      blockchain_reference: data.blockchain_tx_hash,
      verification_date: data.verification_date
    };
  } catch (error) {
    console.error('Status check error:', error);
    throw error;
  }
}
