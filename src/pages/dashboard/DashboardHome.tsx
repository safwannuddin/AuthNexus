import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, FileCheck, FileX, FilePlus, ChevronRight } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DocumentList from '../../components/dashboard/DocumentList';
import { useAuthStore } from '../../store/useAuthStore';
import { useDocumentStore } from '../../store/useDocumentStore';
import { VerificationStatus } from '../../types';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const { documents, fetchDocuments } = useDocumentStore();
  
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);
  
  // Calculate document stats
  const totalDocuments = documents.length;
  const pendingDocuments = documents.filter(doc => doc.status === VerificationStatus.PENDING).length;
  const verifiedDocuments = documents.filter(doc => doc.status === VerificationStatus.VERIFIED).length;
  const failedDocuments = documents.filter(doc => doc.status === VerificationStatus.FAILED).length;
  
  const stats = [
    { 
      title: 'Total Documents', 
      count: totalDocuments, 
      icon: <FileCheck size={20} />, 
      color: 'text-primary-500',
      bgColor: 'bg-primary-500/10' 
    },
    { 
      title: 'Pending Verification', 
      count: pendingDocuments, 
      icon: <Clock size={20} />, 
      color: 'text-warning-500',
      bgColor: 'bg-warning-500/10' 
    },
    { 
      title: 'Verified Documents', 
      count: verifiedDocuments, 
      icon: <FileCheck size={20} />, 
      color: 'text-success-500',
      bgColor: 'bg-success-500/10' 
    },
    { 
      title: 'Failed Verification', 
      count: failedDocuments, 
      icon: <FileX size={20} />, 
      color: 'text-error-500',
      bgColor: 'bg-error-500/10' 
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}
        </h1>
        <p className="text-white/70 mb-8">
          Here's an overview of your document verification status
        </p>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <span className={stat.color}>{stat.icon}</span>
                </div>
                <div className={`text-3xl font-bold ${stat.color}`}>
                  {stat.count}
                </div>
              </div>
              <p className="text-white/70 mt-3">{stat.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8"
      >
        <Card>
          <Card.Header
            title="Quick Actions"
            subtitle="Get started with common actions"
          />
          <Card.Body>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/dashboard/upload">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  rightIcon={<ChevronRight size={18} />}
                  leftIcon={<FilePlus size={18} />}
                >
                  <span>Upload New Document</span>
                </Button>
              </Link>
              <Link to="/dashboard/status">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  rightIcon={<ChevronRight size={18} />}
                  leftIcon={<FileCheck size={18} />}
                >
                  <span>View Verification Status</span>
                </Button>
              </Link>
              <Link to="/dashboard/profile">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  rightIcon={<ChevronRight size={18} />}
                  leftIcon={<FileCheck size={18} />}
                >
                  <span>Update Profile</span>
                </Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
      
      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <Card.Header
            title="Recent Documents"
            subtitle="Your latest document verification activities"
            action={
              <Link to="/dashboard/status">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            }
          />
          <Card.Body className="p-0">
            <DocumentList />
          </Card.Body>
        </Card>
      </motion.div>
    </div>
  );
}