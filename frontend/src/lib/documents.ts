import { supabase } from './supabase';

export interface DocumentItem {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

export interface DocumentVerification {
  id: string;
  status: 'pending' | 'verified' | 'rejected';
  message?: string;
  verified_at?: string;
}

export async function loadSampleDocuments() {
  try {
    console.log('Loading sample documents...');
    const sampleFiles = [
      { name: 'sample-passport.jpg', type: 'image/jpeg' },
      { name: 'sample-driving-license.pdf', type: 'application/pdf' },
      { name: 'sample-identity-card.png', type: 'image/png' }
    ];

    for (const file of sampleFiles) {
      const blob = new Blob(['sample content'], { type: file.type });
      const { error } = await supabase.storage
        .from('documents')
        .upload(file.name, blob);

      if (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Error loading sample documents:', error);
  }
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const { data: files, error } = await supabase.storage
    .from('documents')
    .list();

  if (error) {
    console.error('Error fetching documents:', error);
    return [];
  }

  return files.map(file => ({
    id: file.id,
    name: file.name,
    url: supabase.storage.from('documents').getPublicUrl(file.name).data.publicUrl,
    created_at: file.created_at
  }));
}

export async function checkVerificationStatus(documentId: string): Promise<DocumentVerification> {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('document_id', documentId)
    .single();

  if (error) {
    console.error('Error checking verification status:', error);
    return {
      id: documentId,
      status: 'pending'
    };
  }

  return data;
}
