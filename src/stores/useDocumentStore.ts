import { create } from 'zustand';
import { supabase } from '../utils/supabase';

interface VerificationResult {
  success: boolean;
  message: string;
  verification_result: {
    is_valid: boolean;
    confidence: number;
    details: {
      extracted_text: string;
      confidence_score: number;
      verification_date: string;
      validation_checks: Record<string, boolean>;
    };
    errors: string[];
  };
}

interface DocumentState {
  isVerifying: boolean;
  verificationResult: VerificationResult | null;
  error: string | null;
  verifyDocument: (file: File, documentType: string) => Promise<VerificationResult>;
}

export const useDocumentStore = create<DocumentState>((set) => ({
  isVerifying: false,
  verificationResult: null,
  error: null,
  verifyDocument: async (file: File, documentType: string) => {
    set({ isVerifying: true, error: null });
    try {
      // 1. Upload file to Supabase storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Convert file to base64
      const base64Data = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]);
        };
        reader.readAsDataURL(file);
      });

      // 3. Send to verification API
      const response = await fetch('http://localhost:8000/api/verify-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_type: documentType,
          document_data: base64Data,
          user_id: 'test-user' // In production, use actual user ID
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json() as VerificationResult;
      set({ verificationResult: result, isVerifying: false });
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: errorMessage, isVerifying: false });
      throw error;
    }
  },
})); 