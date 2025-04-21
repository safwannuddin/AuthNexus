import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function CallToAction() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card p-10 md:p-16 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          {/* Background glowing orbs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Secure Your Documents?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Join thousands of individuals and organizations protecting their important 
              documents with blockchain verification.
            </p>
            
            <Link to="/dashboard">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>
                Get Started Now
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}