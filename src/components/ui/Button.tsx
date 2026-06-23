import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  magnetic = false,
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    // Calculate distance from center
    const x = clientX - centerX;
    const y = clientY - centerY;
    // Pull towards mouse (e.g. 35% of the distance)
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-amber-500 to-blue-700 text-white hover:from-amber-400 hover:to-blue-600 shadow-lg hover:shadow-amber-500/50",
    secondary: "bg-gradient-to-r from-emerald-500 to-green-700 text-white hover:from-emerald-400 hover:to-green-600 shadow-lg hover:shadow-emerald-500/50",
    outline: "border-2 border-amber-400/50 text-amber-400 hover:bg-amber-400/10 hover:border-amber-400"
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        x: shouldReduceMotion ? 0 : position.x, 
        y: shouldReduceMotion ? 0 : position.y 
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 block">{children}</span>
      {variant !== 'outline' && !shouldReduceMotion && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
      )}
    </motion.button>
  );
};
