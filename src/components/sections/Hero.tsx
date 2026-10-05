import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroBackground } from '../ui/HeroBackground';
import { Marquee } from '../ui/Marquee';

const tickerItems = ['AI Automation for Growing Businesses', 'Microsoft 365', 'Azure', 'n8n', 'Peterborough, UK'];

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12, delayChildren: shouldReduceMotion ? 0 : 0.3 } },
  };
  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 z-0"><HeroBackground /><div className="absolute inset-0 bg-black/45" /></div>
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <motion.div style={shouldReduceMotion ? { opacity: 1 } : { y: y1, opacity }} variants={containerVariants} initial="hidden" animate="visible" className="text-center max-w-5xl mx-auto">
          <motion.div variants={itemVariants} className="mb-10">
            <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.03 }} className="relative group inline-block">
              <img src="/Gauntlet_Brand_Transparent_Background.png" alt="Gauntlet Group" className="w-72 md:w-96 object-contain drop-shadow-[0_0_60px_rgba(245,158,11,0.25)] mx-auto" />
              <div className="absolute inset-0 bg-amber-400/5 blur-3xl scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
            </motion.div>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight text-white">
            <span className="block">Automate the Busywork.</span>
            <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-blue-400 bg-clip-text text-transparent">Focus on Growth.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-base md:text-lg text-gray-200 mb-10 mt-8 max-w-2xl mx-auto leading-relaxed">
            Custom IT and AI automation for SaaS teams. Connect your systems, reduce repetitive tasks, and give your team more time for the work that matters.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="primary" magnetic={!shouldReduceMotion} onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })}>
              Book a Free Automation Review <ArrowRight className="ml-2 inline" size={20} />
            </Button>
            <Button variant="outline" magnetic={!shouldReduceMotion} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth' })}>
              Explore Our Automations
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-8 mt-16 max-w-md mx-auto">
            {[{ value: '100%', label: 'Client-owned' }, { value: 'FREE', label: 'Automation review' }].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-300 mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-gray-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: shouldReduceMotion ? 0 : 1.5, duration: 0.6 }} className="relative z-10 border-t border-white/10 py-4 bg-black/70 backdrop-blur-sm">
        <Marquee items={tickerItems} speed={35} className="text-gray-200 text-sm font-semibold uppercase tracking-widest" />
      </motion.div>

      <motion.div animate={shouldReduceMotion ? {} : { y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-20 left-1/2 -translate-x-1/2 text-amber-300/70 z-20" aria-hidden="true">
        <MousePointer2 size={20} />
      </motion.div>
    </section>
  );
};
