'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '../../../components/dashboard/Header';
import Sidebar from '../../../components/dashboard/Sidebar';
import Image from 'next/image';

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentUploads, setRecentUploads] = useState([]);

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
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Documents</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Verified Documents</h3>
              <p className="text-3xl font-bold">0</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Success Rate</h3>
              <p className="text-3xl font-bold">0%</p>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Document Upload</h2>
            
            <div className="border-2 border-dashed border-gray-400/50 rounded-xl p-12 bg-white/5">
              <div className="space-y-6 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <Image src="/file.svg" alt="Upload" width={64} height={64} className="opacity-75" />
                  </div>
                  <label className="cursor-pointer group">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <div className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      {uploading ? 'Uploading...' : 'Select Document'}
                    </div>
                    <p className="mt-2 text-sm text-gray-300">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG
                    </p>
                  </label>
                </div>
                
                {file && (
                  <div className="mt-6">
                    <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
                      <p className="text-sm text-gray-300">Selected file: {file.name}</p>
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
                      >
                        {uploading ? 'Uploading...' : 'Upload Document'}
                      </button>
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-4">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Uploads Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Recent Uploads</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="py-3 px-4">File Name</th>
                    <th className="py-3 px-4">Upload Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700/50">
                    <td className="py-4 px-4" colSpan={4}>
                      No documents uploaded yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}