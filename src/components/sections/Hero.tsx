import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { FloatingParticles, FloatingTechIcons } from '../ui/Particles';
import { openCalendlyPopup } from '../../hooks/useCalendlyScript';
 
export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
 
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };
 
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40" />
        <FloatingParticles />
        <FloatingTechIcons />
        
        {/* Decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 border border-amber-400/20 rotate-45" 
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-24 h-24 border border-blue-400/20 rotate-12" 
        />
      </div>
 
      <motion.div 
        style={{ y: y1, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Logo and Branding */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <img 
                src="/Gauntlet Brand Transparent Background copy.png" 
                alt="Gauntlet Group Logo" 
                className="h-32 md:h-40 lg:h-48 w-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              />
              <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white">
              GAUNTLET <span className="text-amber-400">GROUP</span>
            </h1>
          </div>
        </motion.div>
 
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
          <Zap className="text-amber-400 mr-2" size={16} />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Next-Gen Technology Solutions</span>
        </motion.div>
        
        {/* Main Headline */}
        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[0.9] tracking-tight">
          Empowering<br />
          <span className="bg-gradient-to-r from-amber-400 via-blue-500 to-amber-600 bg-clip-text text-transparent">Circular Tech</span> Solutions
        </motion.h2>
        
        {/* Sub-text */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Gauntlet Group delivers innovative tech services and responsible e-waste recycling for a cleaner tomorrow.
        </motion.p>
        
        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button variant="primary" onClick={() => openCalendlyPopup(import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/imran-ishaq-gauntlet-group/30min')}>
            Get a Free Assessment <ArrowRight className="ml-2 inline" size={20} />
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Services
          </Button>
        </motion.div>
        
        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
          {[
            { value: '100%', label: 'WEEE Compliant' },
            { value: '24/7', label: 'Tech Support' },
            { value: 'FREE', label: 'Assessment' }
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
 
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-400/50"
      >
        <MousePointer2 size={24} />
      </motion.div>
    </section>
  );
};
