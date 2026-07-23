import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroBackground } from '../ui/HeroBackground';
import { Marquee } from '../ui/Marquee';

const tickerItems = [
  'AI Automation for Growing Businesses',
  'Microsoft 365',
  'Azure',
  'n8n',
  'Peterborough, UK',
  '48hr Pilot Turnaround',
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
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const wordVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '100%', opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main hero content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          style={shouldReduceMotion ? { opacity: 1 } : { y: y1, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Logo — icon placeholder */}
          <motion.div variants={itemVariants} className="mb-10">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              className="relative group inline-block"
            >
              <img
                src="/Gauntlet_Brand_Transparent_Background.png"
                alt="Gauntlet Group"
                className="w-72 md:w-96 object-contain drop-shadow-[0_0_60px_rgba(245,158,11,0.25)] mx-auto"
              />
              <div className="absolute inset-0 bg-amber-400/5 blur-3xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Headline — word by word assembly */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={wordVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight"
            >
              Automate
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              variants={wordVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight"
            >
              the Busywork.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              variants={wordVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] tracking-tight bg-gradient-to-r from-amber-400 via-blue-500 to-amber-600 bg-clip-text text-transparent"
            >
              Focus on Growth
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Alerts triaged. Passwords reset. Onboarding handled. Your team stops firefighting.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              magnetic={true}
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Book a Free Review <ArrowRight className="ml-2 inline" size={20} />
            </Button>
            <Button
              variant="outline"
              magnetic={true}
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See Our Automations
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            {[
              { value: '48hr', label: 'Pilot Turnaround' },
              { value: '100%', label: 'Client-Owned' },
              { value: 'FREE', label: 'Automation Review' },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee ticker at bottom of hero */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.5, duration: 0.6 }}
        className="relative z-10 border-t border-white/5 py-4 bg-black/50 backdrop-blur-sm"
      >
        <Marquee
          items={tickerItems}
          speed={35}
          className="text-gray-600 text-sm font-semibold uppercase tracking-widest"
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-amber-400/40 z-20"
      >
        <MousePointer2 size={20} />
      </motion.div>
    </section>
  );
};
