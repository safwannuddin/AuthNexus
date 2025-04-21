import React, { useState } from 'react';
import { useDocumentStore } from '../../store/useDocumentStore';
import { DocumentType } from '../../types';

const StorageUploadTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const { uploadNewDocument, error } = useDocumentStore();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setUploadResult(null);
    
    try {
      const success = await uploadNewDocument(file, DocumentType.ID_CARD);
      
      setUploadResult({
        success,
        message: success 
          ? `File uploaded successfully! Check Supabase storage.` 
          : `Upload failed. See console for details.`
      });
    } catch (err) {
      console.error('Upload test error:', err);
      setUploadResult({
        success: false,
        message: err instanceof Error ? err.message : 'Unknown error occurred'
      });
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <div className="p-4 border rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Storage Upload Test</h2>
      
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange}
          className="mb-2"
          disabled={uploading}
        />
        
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`px-4 py-2 rounded ${
            !file || uploading ? 'bg-gray-300' : 'bg-blue-500 text-white'
          }`}
        >
          {uploading ? 'Uploading...' : 'Test Upload'}
        </button>
      </div>
      
      {uploadResult && (
        <div className={`p-3 rounded ${uploadResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
          <p className={uploadResult.success ? 'text-green-700' : 'text-red-700'}>
            {uploadResult.message}
          </p>
        </div>
      )}
      
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default StorageUploadTest;
