import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Wrench, Brain, Plug, Shield, Rocket, Recycle } from 'lucide-react';

const cards = [
  { icon: Wrench, title: 'IT-First Thinking', description: 'Built by people who run real IT environments.', accent: 'amber' },
  { icon: Brain, title: 'Practical AI', description: 'AI where it improves a workflow — not for hype.', accent: 'amber' },
  { icon: Plug, title: 'Works With Your Stack', description: 'Microsoft 365, Azure, Teams, n8n, Slack, and more.', accent: 'blue' },
  { icon: Shield, title: 'Security-Conscious', description: 'Your credentials. Least-privilege access. No secrets in workflows.', accent: 'blue' },
  { icon: Rocket, title: 'Start Small, Prove Value', description: 'One pilot. Low risk. Fast results.', accent: 'amber' },
  { icon: Recycle, title: 'Sustainable IT', description: 'Full lifecycle — from daily ops to responsible disposal.', accent: 'emerald' },
];

const accentMap = {
  amber: { icon: 'text-amber-400 border-amber-400/20 bg-amber-400/5 group-hover:border-amber-400/40', border: 'hover:border-amber-400/20' },
  blue: { icon: 'text-blue-400 border-blue-400/20 bg-blue-400/5 group-hover:border-blue-400/40', border: 'hover:border-blue-400/20' },
  emerald: { icon: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5 group-hover:border-emerald-400/40', border: 'hover:border-emerald-400/20' },
};

export const WhyUs: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  };

  const cardVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="why-us" className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Why Us</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Why{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Gauntlet Group</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 max-w-xl mx-auto"
          >
            Practical automation from people who understand real IT.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => {
            const ac = accentMap[card.accent as keyof typeof accentMap];
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -5 }}
                className={`p-8 bg-gray-950/60 border border-white/5 ${ac.border} rounded-[2rem] flex flex-col gap-4 group cursor-default transition-all duration-300`}
              >
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${ac.icon}`}>
                  <card.icon size={26} />
                </div>
                <h3 className="text-lg font-bold text-white">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
