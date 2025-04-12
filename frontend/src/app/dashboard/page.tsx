'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '../../../components/dashboard/Header';
import Sidebar from '../../../components/dashboard/Sidebar';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentUploads, setRecentUploads] = useState<UploadedFile[]>([]);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const { data: files, error } = await supabase.storage
        .from('documents')
        .list();

      if (error) {
        throw error;
      }

      const uploads = files?.map(file => ({
        id: file.id || file.name,
        name: file.name,
        url: supabase.storage.from('documents').getPublicUrl(file.name).data.publicUrl,
        created_at: file.created_at || new Date().toISOString()
      })) || [];

      setRecentUploads(uploads);
    } catch (error) {
      console.error('Error loading documents:', error);
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

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      await loadDocuments();
      alert('File uploaded successfully!');
      setFile(null);
    } catch (err) {
      console.error('Upload failed:', err);
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
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Upload Document</h2>
            <div className="border-2 border-dashed border-gray-400/50 rounded-xl p-12 bg-white/5">
              <div className="space-y-6 text-center">
                <input
                  type="file"
                  onChange={e => e.target.files && setFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
                >
                  Select Document
                </label>
                {file && (
                  <div className="mt-4">
                    <p className="text-gray-300">Selected: {file.name}</p>
                    <button
                      onClick={handleUpload}
                      disabled={uploading}
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                    >
                      {uploading ? 'Uploading...' : 'Upload Document'}
                    </button>
                  </div>
                )}
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Recent Uploads</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-gray-400 border-b border-gray-700">
                  <tr>
                    <th className="py-4 px-4">File Name</th>
                    <th className="py-4 px-4">Upload Date</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((doc) => (
                    <tr key={doc.id} className="border-b border-gray-700/50">
                      <td className="py-4 px-4">{doc.name}</td>
                      <td className="py-4 px-4">{new Date(doc.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300">
                          pending
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          className="text-blue-400 hover:text-blue-300"
                          onClick={() => window.open(doc.url, '_blank')}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}