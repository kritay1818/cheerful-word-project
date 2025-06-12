
import React from 'react';
import { cn } from '@/lib/utils';

interface ClayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const ClayButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className, 
  type = 'button',
  disabled = false 
}: ClayButtonProps) => {
  const baseClasses = "rounded-2xl font-medium transition-all duration-300 border-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-br from-purple-300 to-purple-400 text-purple-800 shadow-[inset_0_2px_8px_rgba(139,69,19,0.1),0_4px_12px_rgba(139,69,19,0.2)] hover:shadow-[inset_0_2px_8px_rgba(139,69,19,0.15),0_6px_16px_rgba(139,69,19,0.3)] active:shadow-[inset_0_4px_12px_rgba(139,69,19,0.2)]",
    secondary: "bg-gradient-to-br from-blue-200 to-blue-300 text-blue-800 shadow-[inset_0_2px_8px_rgba(59,130,246,0.1),0_4px_12px_rgba(59,130,246,0.2)] hover:shadow-[inset_0_2px_8px_rgba(59,130,246,0.15),0_6px_16px_rgba(59,130,246,0.3)] active:shadow-[inset_0_4px_12px_rgba(59,130,246,0.2)]",
    accent: "bg-gradient-to-br from-green-200 to-green-300 text-green-800 shadow-[inset_0_2px_8px_rgba(34,197,94,0.1),0_4px_12px_rgba(34,197,94,0.2)] hover:shadow-[inset_0_2px_8px_rgba(34,197,94,0.15),0_6px_16px_rgba(34,197,94,0.3)] active:shadow-[inset_0_4px_12px_rgba(34,197,94,0.2)]"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
};

export default ClayButton;
