import { motion } from 'framer-motion';
import { Brain, Shield, Zap, Search } from 'lucide-react';
import FeatureCard from '../ui/FeatureCard';

export default function Features() {
  const features = [
    {
      icon: <Brain size={28} />,
      title: 'AI Verification',
      description: 'Our advanced AI models analyze documents for tampering, forgery, and authenticity with 98.7% accuracy.',
    },
    {
      icon: <Shield size={28} />,
      title: 'Blockchain Hash Storage',
      description: 'Document verification results are stored as cryptographic hashes on the Sui blockchain for immutable proof.',
    },
    {
      icon: <Zap size={28} />,
      title: 'Fast & Secure',
      description: 'Lightning-fast verification that keeps your documents safe while never storing the actual content.',
    },
    {
      icon: <Search size={28} />,
      title: 'Tamper Detection',
      description: 'Advanced algorithms detect even the smallest signs of document tampering or manipulation.',
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Protecting Digital Truth
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            AuthNexus combines cutting-edge AI with blockchain technology to create an 
            unbreakable chain of trust for your most important documents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}