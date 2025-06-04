
import React from 'react';
import { cn } from '@/lib/utils';

interface ClayInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
  name?: string;
  disabled?: boolean;
}

const ClayInput = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  type = 'text', 
  required = false, 
  className,
  multiline = false,
  rows = 3,
  name,
  disabled = false
}: ClayInputProps) => {
  const inputClasses = `w-full px-4 py-3 rounded-2xl bg-gradient-to-br from-white to-slate-50 border-0 shadow-[inset_0_4px_12px_rgba(0,0,0,0.1),inset_0_2px_6px_rgba(255,255,255,0.7)] focus:shadow-[inset_0_4px_16px_rgba(139,69,19,0.15),inset_0_2px_8px_rgba(255,255,255,0.5)] focus:outline-none text-slate-700 placeholder-slate-400 transition-all duration-300 ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : ''}`;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-slate-600 px-2">
          {label} {required && <span className="text-pink-400">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={inputClasses}
        />
      )}
    </div>
  );
};

export default ClayInput;
