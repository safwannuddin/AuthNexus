import { create } from 'zustand';
import { Document, DocumentType, VerificationStatus, VerificationStep } from '../types';
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

      console.log('📤 Starting document upload process...');
      console.log('File:', file.name, 'Type:', type);

      // Create initial document record
      console.log('📝 Creating document record in database...');
      const { data: document, error: createError } = await supabase
        .from('documents')
        .insert([{
          user_id: user.id,
          name: file.name,
          type: type,
          status: VerificationStatus.PENDING,
          current_step: VerificationStep.UPLOADING,
          uploaded_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (createError) throw createError;
      console.log('✅ Document record created:', document);

      // Update local state
      set(state => ({
        documents: [document, ...state.documents]
      }));

      // Upload file to Supabase storage
      console.log('📤 Uploading file to Supabase storage...');
      const { fileName, publicUrl } = await uploadToSupabase(file, user.id);
      console.log('✅ File uploaded:', fileName);
      
      // Update document with file info
      console.log('📝 Updating document with file info...');
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          file_url: publicUrl,
          file_path: fileName,
          current_step: VerificationStep.SAVING_DB
        })
        .eq('id', document.id);

      if (updateError) throw updateError;
      console.log('✅ Document updated with file info');

      // Update local state
      set(state => ({
        documents: state.documents.map(d => 
          d.id === document.id ? {
            ...d,
            file_url: publicUrl,
            file_path: fileName,
            current_step: VerificationStep.SAVING_DB
          } : d
        )
      }));
      
      // Start verification process
      console.log('🔍 Starting verification process...');
      await get().verifyDocument(document.id);
      
      set({ isLoading: false });
      return true;
    } catch (error) {
      console.error('❌ Error in upload process:', error);
      set({ 
        error: 'Failed to upload document', 
        isLoading: false 
      });
      return false;
    }
  },

  verifyDocument: async (documentId: string) => {
    try {
      const document = get().documents.find(d => d.id === documentId);
      if (!document) throw new Error('Document not found');

      console.log('🔍 Starting document verification...');
      console.log('Document:', document.name, 'ID:', documentId);

      // Update step to sending to API
      console.log('📤 Sending document to verification API...');
      await supabase
        .from('documents')
        .update({ current_step: VerificationStep.SENDING_API })
        .eq('id', documentId);

      set(state => ({
        documents: state.documents.map(d => 
          d.id === documentId ? {
            ...d,
            current_step: VerificationStep.SENDING_API
          } : d
        )
      }));

      // Download file directly from Supabase storage
      console.log('🔄 Downloading file from Supabase storage...');
      const { data: fileData, error: downloadError } = await supabase.storage
        .from('documents')
        .download(document.file_path);

      if (downloadError) {
        console.error('Error downloading file:', downloadError);
        throw new Error(`Failed to download file: ${downloadError.message}`);
      }

      // Convert blob to base64
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
        reader.readAsDataURL(fileData);
      });
      console.log('✅ File converted to base64');

      // Update step to processing
      console.log('🔄 Processing document...');
      await supabase
        .from('documents')
        .update({ current_step: VerificationStep.PROCESSING })
        .eq('id', documentId);

      set(state => ({
        documents: state.documents.map(d => 
          d.id === documentId ? {
            ...d,
            current_step: VerificationStep.PROCESSING
          } : d
        )
      }));

      // Call verification API
      console.log('📤 Sending request to verification API...');
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

      if (!verificationResponse.ok) {
        const errorData = await verificationResponse.json();
        throw new Error(errorData.detail || 'Verification failed');
      }

      console.log('📥 Received response from API:', verificationResponse.status);
      const result = await verificationResponse.json();
      console.log('API Response:', result);
      
      if (!result.success) {
        throw new Error(result.message || 'Verification failed');
      }
      
      // Update document status in database
      console.log('📝 Updating document status...');
      const { error } = await supabase
        .from('documents')
        .update({
          status: result.verification_result.is_valid ? 
            VerificationStatus.VERIFIED : 
            VerificationStatus.FAILED,
          verification_result: result.verification_result,
          verified_at: new Date().toISOString(),
          current_step: VerificationStep.COMPLETED
        })
        .eq('id', documentId);

      if (error) throw error;
      console.log('✅ Document status updated');

      // Update local state
      set(state => ({
        documents: state.documents.map(d => 
          d.id === documentId ? {
            ...d,
            status: result.verification_result.is_valid ? 
              VerificationStatus.VERIFIED : 
              VerificationStatus.FAILED,
            verification_result: result.verification_result,
            verified_at: new Date().toISOString(),
            current_step: VerificationStep.COMPLETED
          } : d
        )
      }));

      return true;
    } catch (error) {
      console.error('❌ Error in verification process:', error);
      
      // Update document with error
      await supabase
        .from('documents')
        .update({
          status: VerificationStatus.FAILED,
          error_message: error instanceof Error ? error.message : 'Unknown error occurred',
          current_step: VerificationStep.COMPLETED
        })
        .eq('id', documentId);

      set(state => ({
        documents: state.documents.map(d => 
          d.id === documentId ? {
            ...d,
            status: VerificationStatus.FAILED,
            error_message: error instanceof Error ? error.message : 'Unknown error occurred',
            current_step: VerificationStep.COMPLETED
          } : d
        )
      }));

      return false;
    }
  }
}));