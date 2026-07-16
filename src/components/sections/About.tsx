import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Cpu, Zap, Plug, Rocket } from 'lucide-react';

const highlights = [
  { icon: Cpu, title: 'Built by IT People', description: 'Real IT ops experience, not just theory.' },
  { icon: Zap, title: 'Practical AI', description: 'AI where it makes a measurable impact.' },
  { icon: Plug, title: 'Your Stack', description: 'Microsoft 365, Azure, Teams, Slack, n8n.' },
  { icon: Rocket, title: 'Start Small', description: 'Pilot one workflow. Prove value fast.' },
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-14">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/50 border border-cyan-500/30 rounded-full px-6 py-2 mb-6"
          >
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">About Us</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-8"
          >
            We build AI automations that handle the{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">repetitive work</span>{' '}
            your team shouldn't have to.
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            From IT helpdesks to onboarding, our systems work around the clock — so your people don't have to.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
              className="bg-[#0B1120] border border-white/5 hover:border-cyan-400/30 rounded-2xl p-6 text-center transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-400/15 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300">
                <item.icon className="text-cyan-400" size={22} />
              </div>
              <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
