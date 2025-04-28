import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentStore } from '../../store/useDocumentStore';
import { VerificationStatus, VerificationStep } from '../../types/document';
import { supabase } from '../../utils/supabase';

interface Document {
  id: string;
  name: string;
  type: string;
  status: VerificationStatus;
  file_path: string;
  created_at: string;
  verified_at?: string;
  current_step: VerificationStep;
  verification_result?: {
    is_valid: boolean;
    confidence_score?: number;
    details?: Record<string, any>;
    errors?: string[];
  };
}

const DocumentStatusPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const { documents } = useDocumentStore();

  useEffect(() => {
    const loadDocument = async () => {
      if (!documentId) return;
      
      try {
        setLoading(true);
        
        // First try to find the document in the store
        const docFromStore = documents.find(d => d.id === documentId);
        
        if (docFromStore) {
          setDocument(docFromStore);
          
          // Get the file URL
          if (docFromStore.file_path) {
            const { data } = supabase.storage
              .from('documents')
              .getPublicUrl(docFromStore.file_path);
              
            setFileUrl(data.publicUrl);
          }
        } else {
          // If not in store, fetch from database
          const { data, error } = await supabase
            .from('documents')
            .select('*')
            .eq('id', documentId)
            .single();
            
          if (error) throw error;
          
          setDocument(data);
          
          // Get the file URL
          if (data.file_path) {
            const { data: urlData } = supabase.storage
              .from('documents')
              .getPublicUrl(data.file_path);
              
            setFileUrl(urlData.publicUrl);
          }
        }
      } catch (err) {
        console.error('Error loading document:', err);
        setError('Failed to load document details');
      } finally {
        setLoading(false);
      }
    };
    
    loadDocument();
  }, [documentId, documents]);

  const getStatusColor = (status: VerificationStatus) => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'text-green-600';
      case VerificationStatus.FAILED:
        return 'text-red-600';
      case VerificationStatus.PENDING:
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStepStatus = (currentStep: VerificationStep, step: VerificationStep) => {
    const stepOrder = [
      VerificationStep.UPLOADING,
      VerificationStep.PROCESSING,
      VerificationStep.SENDING_API,
      VerificationStep.COMPLETED
    ];
    
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);
    
    if (stepIndex < currentIndex) {
      return 'text-green-600';
    } else if (stepIndex === currentIndex) {
      return 'text-blue-600 font-bold';
    } else {
      return 'text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !document) {
    return (
      <div className="p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
        <p>{error || 'Document not found'}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Document Verification Status</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Document Details</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {document.name}</p>
              <p><span className="font-medium">Type:</span> {document.type}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-2 ${getStatusColor(document.status)}`}>
                  {document.status}
                </span>
              </p>
              <p><span className="font-medium">Uploaded:</span> {new Date(document.created_at).toLocaleString()}</p>
              {document.verified_at && (
                <p><span className="font-medium">Verified:</span> {new Date(document.verified_at).toLocaleString()}</p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Document Preview</h2>
            {fileUrl ? (
              <div className="border rounded-md p-2">
                <img 
                  src={fileUrl} 
                  alt={document.name} 
                  className="max-h-64 mx-auto"
                />
              </div>
            ) : (
              <p className="text-gray-500">No preview available</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Verification Progress</h2>
        <div className="space-y-4">
          <div className={`${getStepStatus(document.current_step, VerificationStep.UPLOADING)}`}>
            <p className="font-medium">1. Uploading Document</p>
            <p className="text-sm">Document is uploaded to secure storage</p>
          </div>
          
          <div className={`${getStepStatus(document.current_step, VerificationStep.PROCESSING)}`}>
            <p className="font-medium">2. Processing Document</p>
            <p className="text-sm">Extracting text and analyzing document</p>
          </div>
          
          <div className={`${getStepStatus(document.current_step, VerificationStep.SENDING_API)}`}>
            <p className="font-medium">3. Verifying Document</p>
            <p className="text-sm">Sending document for verification</p>
          </div>
          
          <div className={`${getStepStatus(document.current_step, VerificationStep.COMPLETED)}`}>
            <p className="font-medium">4. Verification Complete</p>
            <p className="text-sm">Document verification process finished</p>
          </div>
        </div>
      </div>
      
      {document.verification_result && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Verification Results</h2>
          
          <div className="mb-4">
            <p className="font-medium">Verification Status:</p>
            <span className={`ml-2 ${document.verification_result.is_valid ? 'text-green-600' : 'text-red-600'}`}>
              {document.verification_result.is_valid ? 'Valid' : 'Invalid'}
            </span>
          </div>
          
          {document.verification_result.confidence_score !== undefined && (
            <div className="mb-4">
              <p className="font-medium">Confidence Score:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className={`h-2.5 rounded-full ${document.verification_result.confidence_score > 0.7 ? 'bg-green-600' : document.verification_result.confidence_score > 0.4 ? 'bg-yellow-500' : 'bg-red-600'}`}
                  style={{ width: `${document.verification_result.confidence_score * 100}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{Math.round(document.verification_result.confidence_score * 100)}%</p>
            </div>
          )}
          
          {document.verification_result.details && (
            <div className="mb-4">
              <p className="font-medium">Verification Details:</p>
              <div className="mt-2 space-y-2">
                {Object.entries(document.verification_result.details).map(([key, value]) => {
                  if (key === 'validation_checks' && typeof value === 'object') {
                    return (
                      <div key={key} className="ml-4">
                        <p className="font-medium">Validation Checks:</p>
                        <ul className="list-disc ml-6">
                          {Object.entries(value as Record<string, boolean>).map(([checkKey, checkValue]) => (
                            <li key={checkKey} className={checkValue ? 'text-green-600' : 'text-red-600'}>
                              {checkKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {checkValue ? '✓' : '✗'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  
                  if (key === 'extracted_text') {
                    return (
                      <div key={key} className="ml-4">
                        <p className="font-medium">Extracted Text:</p>
                        <div className="bg-gray-100 p-3 rounded-md mt-1 max-h-40 overflow-y-auto">
                          <pre className="text-sm whitespace-pre-wrap">{value as string}</pre>
                        </div>
                      </div>
                    );
                  }
                  
                  if (key === 'error_message') {
                    return (
                      <div key={key} className="ml-4">
                        <p className="font-medium">Error Message:</p>
                        <p className="text-red-600">{value as string}</p>
                      </div>
                    );
                  }
                  
                  return (
                    <p key={key} className="ml-4">
                      <span className="font-medium">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span> {String(value)}
                    </p>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentStatusPage; 