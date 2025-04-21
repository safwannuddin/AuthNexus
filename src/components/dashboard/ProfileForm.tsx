import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { createOrUpdateProfile } from '../../utils/api';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User, Mail, Wallet, CheckCircle } from 'lucide-react';

export default function ProfileForm() {
  const { user, fetchUserProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    walletAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        walletAddress: user.walletAddress || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { success, error } = await createOrUpdateProfile(formData);
      
      if (success) {
        setSubmitSuccess(true);
        fetchUserProfile();
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setError(error || 'Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred while updating the profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="glass-card p-8">
        <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-error-500/10 border border-error-500/20 rounded-lg text-error-500">
            {error}
          </div>
        )}
        
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-success-500/10 border border-success-500/20 rounded-lg text-success-500 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            <span>Profile updated successfully!</span>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            icon={<User size={18} />}
            placeholder="Enter your full name"
            required
          />
          
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            icon={<Mail size={18} />}
            placeholder="Enter your email address"
            required
          />
          
          <Input
            label="Sui Wallet Address"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            icon={<Wallet size={18} />}
            placeholder="Enter your Sui wallet address"
            required
          />
          
          <div className="flex justify-end mt-8">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}