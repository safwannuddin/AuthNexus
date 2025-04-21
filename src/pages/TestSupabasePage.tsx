import React from 'react';
import SupabaseConnectionTest from '../components/test/SupabaseConnectionTest';
import StorageUploadTest from '../components/test/StorageUploadTest';

const TestSupabasePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Testing</h1>
      <SupabaseConnectionTest />
      <StorageUploadTest />
    </div>
  );
};

export default TestSupabasePage;
