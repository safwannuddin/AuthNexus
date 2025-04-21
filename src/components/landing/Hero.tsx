import { ArrowRight, Brain, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <div className="min-h-screen relative flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="container-custom relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-white/10 border border-white/20 text-sm">
              <Shield size={14} className="mr-2 text-primary-500" />
              Decentralized Document Security
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Verify Documents with <span className="text-primary-500">AI</span>.<br />
              Store Truth on <span className="text-secondary-500">Blockchain</span>.
            </h1>
            
            <p className="text-white/70 text-lg md:text-xl mb-8 max-w-lg">
              Protect your valuable documents with AI-powered verification and blockchain-backed 
              authenticity proofs.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/dashboard">
                <Button rightIcon={<ArrowRight size={18} />}>
                  Get Started
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline">
                  Learn More
                </Button>
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-primary-500" />
                <span className="text-white/80">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-primary-500" />
                <span className="text-white/80">Blockchain Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-primary-500" />
                <span className="text-white/80">Tamper Detection</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Main feature image */}
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Document verification visual"
                  className="w-full object-cover"
                />
              </div>
              
              {/* Feature card 1 */}
              <motion.div
                initial={{ x: -20, y: -20, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute -top-5 -left-5 glass-card p-4 max-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-500/20">
                    <Brain size={24} className="text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">AI Analysis</h4>
                    <p className="text-white/60 text-xs">98.7% accuracy</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Feature card 2 */}
              <motion.div
                initial={{ x: 20, y: 20, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-5 -right-5 glass-card p-4 max-w-[240px]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary-500/20">
                    <Shield size={24} className="text-secondary-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Blockchain Secured</h4>
                    <p className="text-white/60 text-xs">Tamper-proof records</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}