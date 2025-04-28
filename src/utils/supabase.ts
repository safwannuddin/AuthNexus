import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wyymucpxpnynoqmrjbtb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5eW11Y3B4cG55bm9xbXJqYnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1Nzg3ODcsImV4cCI6MjA1ODE1NDc4N30.2CWXWJHIjasZEJPM7oTWHUYYzeqMhoVim85bv2GIPAk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadToSupabase = async (file: File, userId: string) => {
  try {
    // Upload file to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName);

    return { fileName, publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getDocumentsFromSupabase = async (userId: string) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const checkAndConfigureStorage = async () => {
  try {
    console.log('🔍 Checking Supabase storage configuration...');
    
    // Check if documents bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      throw bucketsError;
    }
    
    const documentsBucket = buckets.find(bucket => bucket.name === 'documents');
    
    if (!documentsBucket) {
      console.log('📦 Creating documents bucket...');
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket('documents', {
        public: true,
        fileSizeLimit: 52428800 // 50MB
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        throw createError;
      }
      
      console.log('✅ Documents bucket created successfully');
    } else {
      console.log('✅ Documents bucket exists');
      
      // Check if bucket is public
      if (!documentsBucket.public) {
        console.log('🔒 Making bucket public...');
        const { error: updateError } = await supabase.storage.updateBucket('documents', {
          public: true
        });
        
        if (updateError) {
          console.error('Error updating bucket:', updateError);
          throw updateError;
        }
        
        console.log('✅ Bucket is now public');
      } else {
        console.log('✅ Bucket is already public');
      }
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error configuring storage:', error);
    return false;
  }
};
