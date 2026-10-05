import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  magnetic?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', magnetic = false, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!magnetic || shouldReduceMotion || !ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({ x: (event.clientX - (left + width / 2)) * 0.25, y: (event.clientY - (top + height / 2)) * 0.25 });
  };

  const baseStyles = 'relative px-8 py-4 rounded-full font-semibold transition-all duration-300 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg hover:shadow-amber-400/25',
    secondary: 'bg-emerald-400 text-black hover:bg-emerald-300 shadow-lg hover:shadow-emerald-400/25',
    outline: 'border-2 border-amber-300 text-amber-200 hover:bg-amber-400/10 hover:border-amber-200',
  };

  return (
    <motion.button ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => setPosition({ x: 0, y: 0 })} animate={{ x: shouldReduceMotion ? 0 : position.x, y: shouldReduceMotion ? 0 : position.y }} transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }} whileHover={shouldReduceMotion ? {} : { scale: 1.02 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 block">{children}</span>
    </motion.button>
  );
};
