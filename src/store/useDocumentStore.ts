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
  }
}));