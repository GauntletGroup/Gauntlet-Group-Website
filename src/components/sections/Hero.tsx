import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroBackground } from '../ui/HeroBackground';

const trustItems = [
  'Microsoft 365',
  'Azure',
  'n8n',
  'Google Gemini',
  'Supabase',
  'Slack',
];

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const y1 = shouldReduceMotion ? 0 : useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = shouldReduceMotion ? 1 : useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <motion.div
        style={shouldReduceMotion ? { opacity: 1 } : { y: y1, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.05 }} className="relative group inline-block">
            <img
              src="/Gauntlet Brand Transparent Background copy.png"
              alt="Gauntlet Group Logo"
              className="h-28 md:h-36 lg:h-40 w-auto drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            />
            <div className="absolute inset-0 bg-amber-400/10 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[0.9] tracking-tight">
          IT Automation<br />
          <span className="bg-gradient-to-r from-amber-400 via-blue-500 to-amber-600 bg-clip-text text-transparent">That Actually Works</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Alerts triaged. Passwords reset. Onboarding handled. Your team stops firefighting.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" magnetic={true} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book a Free Review <ArrowRight className="ml-2 inline" size={20} />
          </Button>
          <Button variant="outline" magnetic={true} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            See Our Automations
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          {[
            { value: '48hr', label: 'Pilot Turnaround' },
            { value: '100%', label: 'Client-Owned' },
            { value: 'FREE', label: 'Automation Review' },
          ].map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Trust Bar */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: 0.8 }}
        className="absolute bottom-24 left-0 right-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-[10px] uppercase tracking-widest text-gray-600 mb-3">Built on the tools you already use</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {trustItems.map((item, i) => (
              <span key={i} className="text-sm font-semibold text-gray-500 hover:text-amber-400 transition-colors duration-300">
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-400/40"
      >
        <MousePointer2 size={20} />
      </motion.div>
    </section>
  );
};
