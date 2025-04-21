import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, ExternalLink, FileText } from 'lucide-react';
import { Document, VerificationStatus } from '../../types';
import { useDocumentStore } from '../../store/useDocumentStore';
import Card from '../ui/Card';

const getStatusIcon = (status: string) => {
  switch (status) {
    case VerificationStatus.VERIFIED:
      return <CheckCircle size={20} className="text-success-500" />;
    case VerificationStatus.FAILED:
      return <AlertTriangle size={20} className="text-error-500" />;
    default:
      return <Clock size={20} className="text-warning-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case VerificationStatus.VERIFIED:
      return 'text-success-500 bg-success-500/10';
    case VerificationStatus.FAILED:
      return 'text-error-500 bg-error-500/10';
    default:
      return 'text-warning-500 bg-warning-500/10';
  }
};

export default function DocumentList() {
  const { documents, fetchDocuments, isLoading } = useDocumentStore();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-10 w-10 border-4 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white/70">No documents found. Upload your first document to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {documents.map((document, index) => (
        <DocumentCard key={document.id} document={document} index={index} />
      ))}
    </div>
  );
}

function DocumentCard({ document, index }: { document: Document; index: number }) {
  const { id, name, type, status, confidenceScore, uploadedAt, txHash } = document;
  
  const uploadDate = new Date(uploadedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  const statusClass = getStatusColor(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <div className="p-3 rounded-lg bg-white/5">
              <DocumentIcon name={name} />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-1">{name}</h3>
              <div className="flex flex-wrap gap-3">
                <span className="text-white/60 text-sm">
                  Type: {type}
                </span>
                <span className="text-white/60 text-sm">
                  Uploaded: {uploadDate}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusClass}`}>
              {getStatusIcon(status)}
              <span className="text-sm font-medium">{status}</span>
            </div>
            
            {confidenceScore !== undefined && (
              <div className="text-white/60 text-sm">
                Confidence: {(confidenceScore * 100).toFixed(1)}%
              </div>
            )}
          </div>
        </div>
        
        {status === VerificationStatus.VERIFIED && txHash && (
          <div className="px-6 py-3 bg-white/5 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Blockchain Transaction:</span>
                <code className="bg-white/10 px-2 py-1 rounded text-xs">{txHash.substring(0, 10)}...{txHash.substring(txHash.length - 6)}</code>
              </div>
              
              <a 
                href={`https://explorer.sui.io/txblock/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-500 hover:text-primary-400 text-sm"
              >
                <span>View on Explorer</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function DocumentIcon({ name }: { name: string }) {
  const extension = name.split('.').pop()?.toLowerCase();
  
  if (extension === 'pdf') {
    return <FileText size={24} className="text-error-500" />;
  } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
    return <FileText size={24} className="text-primary-500" />;
  } else {
    return <FileText size={24} className="text-white" />;
  }
}