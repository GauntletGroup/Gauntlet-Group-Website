import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const Cursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(pointerQuery.matches);
    updateEnabled();
    pointerQuery.addEventListener('change', updateEnabled);
    return () => pointerQuery.removeEventListener('change', updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 16);
      cursorY.set(event.clientY - 16);
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setIsHovering(target.tagName === 'BUTTON' || target.tagName === 'A' || Boolean(target.closest('.cursor-pointer')));
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, enabled]);

  if (!enabled) return null;

  return (
    <>
      <motion.div className="fixed top-0 left-0 w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/50 pointer-events-none z-[9999] mix-blend-difference" style={{ x: cursorX, y: cursorY, scale: isHovering ? 2.5 : 1 }} transition={{ scale: { type: 'spring', ...springConfig } }} aria-hidden="true" />
      <motion.div className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-amber-400 pointer-events-none z-[9999]" style={{ x: mousePosition.x - 3, y: mousePosition.y - 3 }} aria-hidden="true" />
    </>
  );
};
