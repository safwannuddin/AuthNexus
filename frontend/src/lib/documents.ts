import { supabase } from './supabase';

export interface DocumentItem {
  id: string;
  filename: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
  url?: string;
}

export async function fetchDocuments(): Promise<DocumentItem[]> {
  const { data: files, error } = await supabase.storage
    .from('documents')
    .list();

  if (error) {
    throw error;
  }

  return files.map(file => ({
    id: file.id,
    filename: file.name,
    uploadedAt: file.created_at,
    status: 'pending',
    url: supabase.storage
      .from('documents')
      .getPublicUrl(file.name).data.publicUrl
  }));
}

export async function deleteDocument(filename: string) {
  const { error } = await supabase.storage
    .from('documents')
    .remove([filename]);

  if (error) {
    throw error;
  }
}

export async function loadSampleDocuments() {
  const sampleFiles = [
    { name: 'sample-passport.jpg', type: 'image/jpeg' },
    { name: 'sample-driving-license.pdf', type: 'application/pdf' },
    { name: 'sample-identity-card.png', type: 'image/png' }
  ];

  // Create sample blob files
  const files = sampleFiles.map(sample => {
    const content = `Sample content for ${sample.name}`;
    return new File([content], sample.name, { type: sample.type });
  });

  // Upload each sample file
  for (const file of files) {
    try {
      await supabase.storage
        .from('documents')
        .upload(`sample/${file.name}`, file);
    } catch (error) {
      console.error(`Failed to upload ${file.name}:`, error);
    }
  }
}
