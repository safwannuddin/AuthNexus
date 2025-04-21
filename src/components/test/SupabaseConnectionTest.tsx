import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

const SupabaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'success' | 'error'>('checking');
  const [bucketExists, setBucketExists] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Test basic connection
        const { data, error } = await supabase.from('documents').select('count()', { count: 'exact', head: true });
        
        if (error) throw error;
        
        setConnectionStatus('success');
        
        // Check if documents bucket exists
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
        
        if (bucketsError) throw bucketsError;
        
        const documentsBucket = buckets.find(bucket => bucket.name === 'documents');
        setBucketExists(!!documentsBucket);
      } catch (error) {
        console.error('Supabase connection test failed:', error);
        setConnectionStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    }
    
    checkConnection();
  }, []);

  return (
    <div className="p-4 border rounded-md">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="mb-4">
        <p className="font-semibold">Connection Status:</p>
        {connectionStatus === 'checking' && <p>Checking connection...</p>}
        {connectionStatus === 'success' && (
          <p className="text-green-600">✓ Connected to Supabase successfully</p>
        )}
        {connectionStatus === 'error' && (
          <div>
            <p className="text-red-600">✗ Connection failed</p>
            {errorMessage && <p className="text-sm text-gray-600">{errorMessage}</p>}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <p className="font-semibold">Documents Bucket Status:</p>
        {bucketExists === null && <p>Checking bucket...</p>}
        {bucketExists === true && (
          <p className="text-green-600">✓ 'documents' bucket exists</p>
        )}
        {bucketExists === false && (
          <p className="text-red-600">✗ 'documents' bucket not found</p>
        )}
      </div>
    </div>
  );
};

export default SupabaseConnectionTest;
