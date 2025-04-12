'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Header from '@/components/dashboard/Header';
import Sidebar from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      alert('File uploaded successfully!');
      setFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Upload Documents</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="space-y-4 text-center">
                  <div className="flex items-center justify-center">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                      <div className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {uploading ? 'Uploading...' : 'Select File'}
                      </div>
                    </label>
                  </div>
                  
                  {file && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">Selected file: {file.name}</p>
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        Upload
                      </button>
                    </div>
                  )}
                  
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}