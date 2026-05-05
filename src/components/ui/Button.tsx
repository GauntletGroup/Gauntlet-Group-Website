import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-blue-700 text-white hover:from-amber-400 hover:to-blue-600 shadow-lg hover:shadow-amber-500/50",
    secondary: "bg-gradient-to-r from-emerald-500 to-green-700 text-white hover:from-emerald-400 hover:to-green-600 shadow-lg hover:shadow-emerald-500/50",
    outline: "border-2 border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant !== 'outline' && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      )}
    </motion.button>
  );
};
