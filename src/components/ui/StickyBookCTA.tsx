import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export const StickyBookCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
            <button
              onClick={handleClick}
              className="relative flex items-center gap-2 bg-amber-400 text-black font-bold rounded-full px-6 py-3 shadow-2xl hover:scale-105 transition-transform duration-200"
            >
              <Calendar size={16} />
              Book a Free Review
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
