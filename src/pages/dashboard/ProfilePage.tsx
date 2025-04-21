import { motion } from 'framer-motion';
import ProfileForm from '../../components/dashboard/ProfileForm';

export default function ProfilePage() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">User Profile</h1>
        <p className="text-white/70 mb-8">
          Manage your personal information and wallet address
        </p>
      </motion.div>
      
      <ProfileForm />
    </div>
  );
}