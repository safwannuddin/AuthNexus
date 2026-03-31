import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isGlass?: boolean;
  hoverable?: boolean;
}

export default function Card({ 
  children, 
  className, 
  isGlass = false,
  hoverable = false
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, transition: { type: 'spring', stiffness: 300 } } : {}}
      className={clsx(
        'rounded-xl',
        isGlass 
          ? 'glass-card' 
          : 'bg-background-dark/80 border border-white/10 shadow-lg',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

Card.Header = function CardHeader({ 
  title, 
  subtitle, 
  icon, 
  action 
}: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between p-6 border-b border-white/10">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary-500">{icon}</div>}
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          {subtitle && <p className="text-white/60 mt-1">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className 
}: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('p-6', className)}>{children}</div>;
};

Card.Footer = function CardFooter({ 
  children, 
  className 
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('px-6 py-4 border-t border-white/10', className)}>
      {children}
    </div>
  );
};