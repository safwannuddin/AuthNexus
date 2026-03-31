import { motion } from 'framer-motion';
import DocumentList from '../../components/dashboard/DocumentList';

export default function StatusPage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Document Verification Status</h1>
        <p className="text-white/70 mb-8">
          Track the verification status of all your uploaded documents
        </p>
      </motion.div>
      
      <DocumentList />
    </div>
  );
}