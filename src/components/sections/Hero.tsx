import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MousePointer2, Zap, Clock, ShieldCheck, Bot, Ticket, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { HeroBackground } from '../ui/HeroBackground';
import { openCalendlyPopup } from '../../hooks/useCalendlyScript';

const stats = [
  { value: '24/7', label: 'Uptime', icon: Clock },
  { value: '<3s', label: 'Response Time', icon: Zap },
  { value: '100%', label: 'Audit Logged', icon: ShieldCheck },
];

const flowSteps = [
  { icon: Ticket, label: 'Ticket', color: 'text-orange-400' },
  { icon: Bot, label: 'Bot', color: 'text-cyan-400' },
  { icon: CheckCircle2, label: 'Resolved', color: 'text-emerald-400' },
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
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15, delayChildren: shouldReduceMotion ? 0 : 0.2 },
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
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        style={shouldReduceMotion ? { opacity: 1 } : { y: y1, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
          <Zap className="text-cyan-400 mr-2" size={16} />
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">AI Automation</span>
        </motion.div>

        {/* Headline */}
        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[0.9] tracking-tight text-white">
          Automate the Busywork.<br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Focus on Growth.</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          AI-powered automations that save hours, cut costs, and never sleep.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button variant="primary" magnetic={true} onClick={() => openCalendlyPopup()}>
            Book a Free Demo <ArrowRight className="ml-2 inline" size={20} />
          </Button>
          <Button variant="outline" magnetic={true} onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            See Our Automations
          </Button>
        </motion.div>

        {/* Animated task flow visual */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 md:gap-8 mb-16">
          {flowSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-8">
              <motion.div
                animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gray-800/50 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <step.icon className={step.color} size={28} />
                </div>
                <span className="text-xs text-gray-500 font-medium">{step.label}</span>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  animate={shouldReduceMotion ? {} : { opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.6 + 0.3 }}
                  className="text-cyan-400 text-2xl"
                >
                  →
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <stat.icon className="text-cyan-400/60 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" size={20} />
              <div className="text-2xl md:text-4xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cyan-400/50"
      >
        <MousePointer2 size={24} />
      </motion.div>
    </section>
  );
};
