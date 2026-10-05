import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Book Call', href: '#book-call' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const shouldReduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => {
    if (isMenuOpen) {
      firstLinkRef.current?.focus();
    } else if (wasMenuOpen.current) {
      menuButtonRef.current?.focus();
    }
    wasMenuOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !menuRef.current) return;
      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>('a, button'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#070B12]/90 backdrop-blur-xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a
              href="#hero"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <img
                src="/Gauntlet_Logo_Transparent_Background.png"
                alt="Gauntlet Group logo"
                className="w-11 h-11 object-contain"
              />
              <span className="text-white font-bold tracking-tight text-lg">Gauntlet Group</span>
            </a>

            <button
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex items-center gap-2 group z-50 rounded-lg px-2 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-navigation-menu"
            >
              <span className="text-sm font-medium tracking-wide uppercase text-gray-200 group-hover:text-white transition-colors">
                {isMenuOpen ? 'Close' : 'Navigate'}
              </span>
              <span className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-hidden="true">
                <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-[3px]' : 'w-5 group-hover:w-6'}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'}`} />
                <span className={`block h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-5 group-hover:w-6'}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <div
            id="site-navigation-menu"
            ref={menuRef}
            className="fixed inset-0 z-40 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { y: '-100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { y: '-100%' }}
              transition={{ duration: shouldReduceMotion ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[#070B12] border-b border-white/10 flex flex-col"
            >
              <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-amber-400/5 blur-[100px] pointer-events-none" />

              <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                <nav className="space-y-2" aria-label="Primary navigation">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -60, y: 12 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -30 }}
                      transition={{ delay: shouldReduceMotion ? 0 : 0.25 + i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="group block relative rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-amber-400/70 text-xs font-mono group-hover:text-amber-400 transition-colors">0{i + 1}</span>
                        <span className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-gray-300 group-hover:text-white tracking-tight transition-colors duration-300">{item.label}</span>
                      </div>
                      <span className="absolute left-0 -bottom-1 h-px w-40 max-w-[60%] bg-gradient-to-r from-amber-400/70 to-transparent origin-left pointer-events-none group-hover:w-full transition-all" />
                    </motion.a>
                  ))}
                </nav>
              </div>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8"
              >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a href="mailto:imran.ishaq@gauntlet-group.com" className="text-gray-300 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                    <Mail size={16} />
                    imran.ishaq@gauntlet-group.com
                  </a>
                  <div className="flex items-center gap-6">
                    <a href="https://www.linkedin.com/company/gauntlet-group" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-amber-400 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" aria-label="LinkedIn">
                      <Linkedin size={20} />
                    </a>
                    <span className="text-gray-300 text-xs">&copy; {new Date().getFullYear()} Gauntlet Group</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
