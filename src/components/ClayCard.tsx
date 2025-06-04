
import React from 'react';
import { cn } from '@/lib/utils';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'pressed';
}

const ClayCard = ({ children, className, variant = 'default' }: ClayCardProps) => {
  const baseClasses = "rounded-3xl p-6 transition-all duration-300";
  
  const variants = {
    default: "bg-gradient-to-br from-slate-100 to-slate-200 shadow-[inset_0_2px_12px_rgba(255,255,255,0.7),inset_0_-2px_12px_rgba(0,0,0,0.1),0_8px_24px_rgba(0,0,0,0.15)]",
    elevated: "bg-gradient-to-br from-white to-slate-100 shadow-[inset_0_2px_12px_rgba(255,255,255,0.8),inset_0_-2px_12px_rgba(0,0,0,0.05),0_12px_32px_rgba(0,0,0,0.2)]",
    pressed: "bg-gradient-to-br from-slate-200 to-slate-300 shadow-[inset_0_4px_16px_rgba(0,0,0,0.15),inset_0_2px_8px_rgba(255,255,255,0.3)]"
  };

  return (
    <div className={cn(baseClasses, variants[variant], className)}>
      {children}
    </div>
  );
};

export default ClayCard;
