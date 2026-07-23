import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface IntroOverlayProps {
  onComplete: () => void;
}

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 600);
    }, 2600);

    return () => clearTimeout(timer);
  }, [shouldReduceMotion, onComplete]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Radial glow behind logo */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[80px]"
          />

          {/* Logo mark — Gauntlet brand logo */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <img
                src="/Gauntlet_Brand_Transparent_Background.png"
                alt="Gauntlet Group"
                className="w-64 md:w-80 object-contain drop-shadow-[0_0_40px_rgba(245,158,11,0.3)]"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent origin-center"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-6 text-center"
            >
              <div className="text-amber-400 text-xs font-semibold uppercase tracking-[0.3em] font-display">
                Gauntlet Group
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ delay: 1.1, duration: 0.5, ease: 'easeOut' }}
                className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mx-auto mt-3"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="text-gray-600 text-[10px] uppercase tracking-widest mt-2"
              >
                AI &amp; IT Automation
              </motion.p>
            </motion.div>
          </div>

          {/* Skip button */}
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onComplete, 300);
            }}
            className="absolute bottom-8 right-8 text-gray-700 hover:text-gray-500 text-[10px] uppercase tracking-widest transition-colors"
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
