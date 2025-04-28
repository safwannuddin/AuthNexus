import { motion } from 'framer-motion';
import DocumentUploader from '../../components/dashboard/DocumentUploader';
import SupabaseConnectionTest from '../../components/test/SupabaseConnectionTest';

export default function UploadPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Upload Document</h1>
        <p className="text-white/70 mb-8">
          Upload documents for AI verification and blockchain proof creation
        </p>
      </motion.div>
      
      <SupabaseConnectionTest />
      <DocumentUploader />
    </div>
  );
}