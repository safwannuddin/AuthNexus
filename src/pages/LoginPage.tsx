import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/useAuthStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 md:p-12"
      >
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Logo />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-white/70 mb-8">Login to access your secure documents</p>
          
          {error && (
            <div className="mb-6 p-4 bg-error-500/10 border border-error-500/20 rounded-lg text-error-500">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              icon={<Mail size={18} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            
            <Input
              label="Password"
              type="password"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/30 bg-white/5"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-white/70">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-primary-500 hover:text-primary-400">
                Forgot password?
              </a>
            </div>
            
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              className="w-full"
            >
              Login
            </Button>
          </form>
          
          <p className="text-center mt-6 text-white/70">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-500 hover:text-primary-400">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
      
      {/* Right side - Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:block lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/40 z-10"></div>
        <img
          src="https://images.pexels.com/photos/3802667/pexels-photo-3802667.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Document Security"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 p-12">
          <div className="glass-card p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-3">
              AI-Powered Document Security
            </h2>
            <p className="text-white/80">
              Protect your valuable documents with blockchain verification and artificial intelligence
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}