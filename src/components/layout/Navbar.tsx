import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navItems = ['About', 'Services', 'Why Us', 'Contact'];

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 group cursor-pointer"
            >
              <img 
                src="/Gauntlet Brand Transparent Background copy.png" 
                alt="Gauntlet Group" 
                className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(184,134,11,0.5)]"
              />
            </motion.div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item === 'Why Us' ? 'why-choose-us' : item.toLowerCase().replace(' ', '-')}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-gray-300 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-all duration-300 group"
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-blue-700 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-amber-500 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-amber-400 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/50 group overflow-hidden"
              >
                <span className="relative z-10">Get Assessment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </motion.a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-cyan-400 focus:outline-none transition-all duration-300 transform hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div 
        initial={false}
        animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-black/90 border-t border-cyan-500/20"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a 
              key={item}
              href={`#${item === 'Why Us' ? 'why-choose-us' : item.toLowerCase().replace(' ', '-')}`}
              className="text-gray-300 hover:text-amber-400 block px-3 py-2 text-base font-medium transition-all duration-300 transform hover:translate-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};
