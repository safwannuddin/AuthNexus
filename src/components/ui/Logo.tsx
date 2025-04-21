import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  dark?: boolean;
}

export default function Logo({ size = 'md', dark = false }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <Shield 
        className={`text-primary-500 ${size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'}`} 
        fill={dark ? '#0F172A' : 'rgba(99, 102, 241, 0.2)'} 
      />
      <span className={`font-heading font-bold ${sizeClasses[size]} ${dark ? 'text-background-dark' : 'text-white'}`}>
        Auth<span className="text-primary-500">Nexus</span>
      </span>
    </div>
  );
}