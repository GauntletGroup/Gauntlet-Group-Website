import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Leaf } from 'lucide-react';

const points = [
  { icon: Zap, text: 'Deploy in Days, Not Months', accent: 'cyan' },
  { icon: ShieldCheck, text: 'Secure & Audit-Logged by Design', accent: 'cyan' },
  { icon: TrendingUp, text: 'Scales as You Grow', accent: 'cyan' },
  { icon: Leaf, text: 'Sustainable Practices Built In', accent: 'emerald' },
];

export const WhyUs: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-us" className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 border border-cyan-500/30 rounded-full px-6 py-2 mb-4"
          >
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">Why Work With Us</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Why{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Gauntlet Group</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              className={`flex items-center gap-5 p-6 bg-gray-950/60 border border-white/5 rounded-2xl group transition-all duration-300 ${
                point.accent === 'cyan'
                  ? 'hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)]'
                  : 'hover:border-emerald-400/30 hover:shadow-[0_0_25px_rgba(52,211,153,0.1)]'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 ${
                point.accent === 'cyan'
                  ? 'border-cyan-400/20 bg-cyan-400/5 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'border-emerald-400/20 bg-emerald-400/5 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)]'
              }`}>
                <point.icon className={point.accent === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'} size={26} />
              </div>
              <h3 className="text-xl font-bold text-white">{point.text}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
