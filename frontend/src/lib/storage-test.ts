import { supabase } from './supabase';

export async function listAllFiles() {
  const { data, error } = await supabase
    .storage
    .from('documents')
    .list();

  if (error) {
    console.error('Error listing files:', error);
    return [];
  }

  console.log('Files in storage:', data);
  return data;
}