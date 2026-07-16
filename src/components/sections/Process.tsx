import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Zap, Rocket, TrendingUp } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Review', description: '20 minutes. We find your highest-impact automation.' },
  { icon: Zap, title: 'Pilot', description: 'One workflow built. Delivered in 48 hours to 2 weeks.' },
  { icon: Rocket, title: 'Launch', description: 'Deployed in your environment. Your credentials, your systems.' },
  { icon: TrendingUp, title: 'Scale', description: 'Monitor, refine, then automate the next process.' },
];

export const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Our Process</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            How We{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Work</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 max-w-xl mx-auto"
          >
            Low risk. Fast results. Prove value before scaling.
          </motion.p>
        </div>

        <div className="relative">
          {!shouldReduceMotion && (
            <div className="absolute top-10 left-0 w-full h-0.5 bg-gray-800 hidden lg:block" />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#0B1120] border-2 border-gray-800 group-hover:border-amber-400/50 rounded-full flex items-center justify-center transition-colors duration-500">
                    <step.icon className="text-amber-400" size={28} />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed max-w-[200px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
