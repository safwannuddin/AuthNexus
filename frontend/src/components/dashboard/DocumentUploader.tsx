import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { DocumentType } from '../../types';
import { useDocumentStore } from '../../store/useDocumentStore';
import { FileText, Upload, CheckCircle, BookOpen, CreditCard } from 'lucide-react';
import Button from '../ui/Button';

const documentTypeInfo = {
  [DocumentType.PASSPORT]: {
    icon: BookOpen,
    description: 'Upload your passport for verification'
  },
  [DocumentType.NATIONAL_ID]: {
    icon: CreditCard,
    description: 'Upload your national ID card for verification'
  },
  [DocumentType.CUSTOM]: {
    icon: FileText,
    description: 'Upload a custom document for verification'
  }
};

export default function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<DocumentType>(DocumentType.PASSPORT);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { uploadNewDocument, isLoading } = useDocumentStore();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setUploadSuccess(false);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const success = await uploadNewDocument(file, documentType);
    if (success) {
      setUploadSuccess(true);
      setFile(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {uploadSuccess ? (
          <div className="text-center p-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="bg-success-500 text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle size={40} />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-4">Document Uploaded Successfully!</h2>
            <p className="text-white/70 mb-6">
              Your document has been uploaded and is now being processed for verification.
              You can check the status in the verification status page.
            </p>
            <Button
              onClick={() => setUploadSuccess(false)}
              variant="primary"
            >
              Upload Another Document
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="glass-card p-8 mb-6">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary-500 bg-primary-500/10' : 'border-white/20 hover:border-white/40'}
                `}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  {file ? (
                    <>
                      <FileText size={48} className="text-primary-500 mb-4" />
                      <p className="font-medium text-lg mb-1">{file.name}</p>
                      <p className="text-white/60 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload size={48} className="text-white/40 mb-4" />
                      <p className="font-medium text-lg mb-2">
                        Drag & drop your document here
                      </p>
                      <p className="text-white/60 max-w-md mx-auto">
                        Supported formats: PDF, JPG, PNG
                      </p>
                      <Button 
                        className="mt-6" 
                        variant="outline" 
                        type="button"
                      >
                        Browse Files
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card p-8 mb-6">
              <h3 className="text-xl font-semibold mb-4">Document Type</h3>
              <p className="text-white/70 mb-4">
                Select the type of document you're uploading for best verification results.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {Object.entries(documentTypeInfo).map(([type, info]) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={type}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        border rounded-lg p-4 cursor-pointer transition-colors
                        ${documentType === type 
                          ? 'border-primary-500 bg-primary-500/10' 
                          : 'border-white/20 hover:border-white/40'}
                      `}
                      onClick={() => setDocumentType(type as DocumentType)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`
                          w-10 h-10 rounded-lg border-2 flex items-center justify-center
                          ${documentType === type ? 'border-primary-500' : 'border-white/40'}
                        `}>
                          <Icon size={20} className={documentType === type ? 'text-primary-500' : 'text-white/40'} />
                        </div>
                        <div>
                          <div className="font-medium">{type.replace('_', ' ').toUpperCase()}</div>
                          <div className="text-sm text-white/60">{info.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="text-center">
              <Button
                type="submit"
                disabled={!file || isLoading}
                isLoading={isLoading}
                size="lg"
              >
                Verify Now
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}