import { motion } from 'framer-motion';
import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ 
  icon, 
  title, 
  description,
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -10,
        transition: { type: 'spring', stiffness: 400 }
      }}
      className="glass-card p-6 flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
}