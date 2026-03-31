import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, FileText, Loader2 } from 'lucide-react';
import { Document, VerificationStatus, VerificationStep } from '../../types';
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

const getStepIcon = (step: VerificationStep) => {
  switch (step) {
    case VerificationStep.COMPLETED:
      return <CheckCircle size={16} className="text-success-500" />;
    case VerificationStep.PROCESSING:
    case VerificationStep.SENDING_API:
    case VerificationStep.SAVING_DB:
    case VerificationStep.UPLOADING:
      return <Loader2 size={16} className="text-primary-500 animate-spin" />;
  }
};

export default function DocumentList() {
  const { documents, fetchDocuments, isLoading } = useDocumentStore();

  useEffect(() => {
    fetchDocuments();
    // Refresh documents every 5 seconds to show progress
    const interval = setInterval(fetchDocuments, 5000);
    return () => clearInterval(interval);
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
  const { name, type, status, current_step, confidence_score, uploaded_at, error_message } = document;
  
  const uploadDate = new Date(uploaded_at).toLocaleDateString('en-US', {
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
              <DocumentIcon />
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
            
            {current_step && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                {getStepIcon(current_step)}
                <span>{current_step}</span>
              </div>
            )}
            
            {error_message && (
              <div className="text-sm text-error-500 mt-2">
                Error: {error_message}
              </div>
            )}
            
            {confidence_score && (
              <div className="text-sm text-white/60">
                Confidence Score: {confidence_score}%
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function DocumentIcon() {
  return <FileText size={24} className="text-white/60" />;
}