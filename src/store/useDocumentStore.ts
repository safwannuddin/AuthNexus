import { create } from 'zustand';
import { Document, DocumentType, VerificationStatus } from '../types';
import { uploadToSupabase, getDocumentsFromSupabase, supabase } from '../utils/supabase';
import { useAuthStore } from './useAuthStore';

interface DocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  fetchDocuments: () => Promise<void>;
  uploadNewDocument: (file: File, type: DocumentType) => Promise<boolean>;
  verifyDocument: (documentId: string) => Promise<boolean>;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,
  
  fetchDocuments: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      const documents = await getDocumentsFromSupabase(user.id);
      set({ documents, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to fetch documents', 
        isLoading: false 
      });
      console.error('Error fetching documents:', error);
    }
  },
  
  uploadNewDocument: async (file: File, type: DocumentType) => {
    set({ isLoading: true, error: null });
    
    try {
      const { user } = useAuthStore.getState();
      if (!user) throw new Error('User not authenticated');

      // Upload file to Supabase storage
      const { fileName, publicUrl } = await uploadToSupabase(file, user.id);
      
      // Create document record in database
      const { data: document, error } = await supabase
        .from('documents')
        .insert([{
          user_id: user.id,
          name: file.name,
          type: type,
          status: VerificationStatus.PENDING,
          file_url: publicUrl,
          file_path: fileName,
          uploaded_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      
      // Start verification process
      await get().verifyDocument(document.id);
      
      set(state => ({
        documents: [document, ...state.documents],
        isLoading: false
      }));
      
      return true;
    } catch (error) {
      set({ 
        error: 'Failed to upload document', 
        isLoading: false 
      });
      console.error('Error uploading document:', error);
      return false;
    }
  },

  verifyDocument: async (documentId: string) => {
    try {
      const document = get().documents.find(d => d.id === documentId);
      if (!document) throw new Error('Document not found');

      // Convert file to base64
      const response = await fetch(document.file_url);
      const blob = await response.blob();
      const reader = new FileReader();
      const base64Data = await new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const result = reader.result;
          if (typeof result === 'string') {
            resolve(result.split(',')[1]);
          } else {
            throw new Error('Failed to convert file to base64');
          }
        };
        reader.readAsDataURL(blob);
      });

      // Call verification API
      const verificationResponse = await fetch('http://localhost:8000/api/verify-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document_type: document.type,
          document_data: base64Data,
          user_id: document.user_id
        })
      });

      const result = await verificationResponse.json();
      
      // Update document status in database
      const { error } = await supabase
        .from('documents')
        .update({
          status: result.verification_result.is_valid ? 
            VerificationStatus.VERIFIED : 
            VerificationStatus.FAILED,
          verification_result: result.verification_result,
          verified_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (error) throw error;

      // Update local state
      set(state => ({
        documents: state.documents.map(d => 
          d.id === documentId ? {
            ...d,
            status: result.verification_result.is_valid ? 
              VerificationStatus.VERIFIED : 
              VerificationStatus.FAILED,
            verification_result: result.verification_result,
            verified_at: new Date().toISOString()
          } : d
        )
      }));

      return true;
    } catch (error) {
      console.error('Error verifying document:', error);
      return false;
    }
  }
}));