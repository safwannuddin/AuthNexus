import { create } from 'zustand';
import { Document, DocumentType, VerificationStatus } from '../types';
import { getDocuments, uploadDocument, mockApi } from '../utils/api';

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
      // In a real app, we would call the actual API
      const { success, data, error } = await mockApi.getDocuments();
      
      if (success && data) {
        set({ documents: data, isLoading: false });
      } else {
        set({ 
          error: error || 'Failed to fetch documents', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: 'Failed to fetch documents', 
        isLoading: false 
      });
    }
  },
  
  uploadNewDocument: async (file: File, type: DocumentType) => {
    set({ isLoading: true, error: null });
    
    try {
      // For demo purposes, simulating a successful upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newDocument: Document = {
        id: Math.random().toString(36).substring(2, 15),
        userId: 'user1',
        name: file.name,
        type: type,
        status: VerificationStatus.PENDING,
        uploadedAt: new Date().toISOString(),
      };
      
      set(state => ({
        documents: [newDocument, ...state.documents],
        isLoading: false
      }));
      
      return true;
    } catch (error) {
      set({ 
        error: 'Failed to upload document', 
        isLoading: false 
      });
      return false;
    }
  }
}));