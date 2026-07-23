import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Shield, X, Mail, Linkedin } from 'lucide-react';

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

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-500">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isMenuOpen ? 'bg-black/95 backdrop-blur-xl' : 'bg-black/0'
          }`}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo — icon placeholder */}
            <a
              href="#hero"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl border border-amber-400/40 flex items-center justify-center bg-amber-400/5 group-hover:border-amber-400/70 transition-all duration-300">
                <Shield className="text-amber-400" size={22} strokeWidth={1.5} />
              </div>
              <span className="text-white font-display font-bold text-sm tracking-wider hidden sm:block">
                GAUNTLET GROUP
              </span>
            </a>

            {/* Menu toggle button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group z-50"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'w-6 rotate-45 translate-y-[3px]' : 'w-5 group-hover:w-6'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'
                }`}
              />
              <span
                className={`block h-0.5 bg-white transition-all duration-300 ${
                  isMenuOpen ? 'w-6 -rotate-45 -translate-y-[3px]' : 'w-5 group-hover:w-6'
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black flex flex-col"
          >
            {/* Background accent */}
            <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-amber-400/5 blur-[100px] pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <nav className="space-y-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 }}
                    animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.1 + i * 0.08,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group block"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-amber-400/40 text-xs font-mono group-hover:text-amber-400 transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-gray-700 group-hover:text-white tracking-tight transition-colors duration-300">
                        {item.label}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Bottom bar with socials */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: 0.4 }}
              className="border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="mailto:imran.ishaq@gauntlet-group.com"
                  className="text-gray-500 hover:text-amber-400 text-sm flex items-center gap-2 transition-colors"
                >
                  <Mail size={16} />
                  imran.ishaq@gauntlet-group.com
                </a>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.linkedin.com/company/gauntlet-group"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-amber-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                  <span className="text-gray-700 text-xs">
                    &copy; {new Date().getFullYear()} Gauntlet Group
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
