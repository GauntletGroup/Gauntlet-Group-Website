import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface StickyBookCTAProps {
  isMenuOpen?: boolean;
  isModalOpen?: boolean;
}

export const StickyBookCTA: React.FC<StickyBookCTAProps> = ({ isMenuOpen = false, isModalOpen = false }) => {
  const [visible, setVisible] = useState(false);
  const [covered, setCovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const bookingSection = document.getElementById('book-call');
    const contactSection = document.getElementById('contact');
    if (!bookingSection || !contactSection) return;

    const observer = new IntersectionObserver(
      (entries) => setCovered(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.15 },
    );
    observer.observe(bookingSection);
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    document.getElementById('book-call')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && !covered && !isMenuOpen && !isModalOpen && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-4 sm:right-6 z-40"
        >
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-amber-400 text-black font-bold rounded-full px-5 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
          >
            <Calendar size={16} />
            Book a Free Automation Review
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
