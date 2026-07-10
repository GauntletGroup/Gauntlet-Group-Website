import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Wrench, Cpu, Plug, Rocket } from 'lucide-react';

const highlights = [
  {
    icon: Wrench,
    title: 'IT-First',
    description: 'Built by people who understand real IT environments'
  },
  {
    icon: Cpu,
    title: 'Practical AI',
    description: 'AI used where it makes a measurable workflow improvement'
  },
  {
    icon: Plug,
    title: 'Your Stack',
    description: 'Works with Microsoft 365, Azure, Teams, n8n, Slack and more'
  },
  {
    icon: Rocket,
    title: 'Start Small',
    description: 'Pilot one workflow — prove value before scaling'
  }
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/50 border border-amber-500/30 rounded-full px-6 py-2 mb-8"
          >
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">About Us</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-10"
          >
            Automation That Works{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">in the Real World</span>
          </motion.h2>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-400 leading-relaxed">
              Gauntlet Group helps growing businesses remove repetitive IT and operational work through practical, proven automation.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              We combine real IT support experience with AI workflows, cloud integrations, and business-process automation — helping teams respond faster, reduce manual administration, and make better use of the tools they already have.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Our background in sustainable IT and WEEE services gives us a wider view of the technology lifecycle: from day-to-day IT operations all the way through to responsible asset management and disposal.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="bg-[#0B1120] border border-white/5 hover:border-amber-400/20 rounded-2xl p-7 text-center transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/15 transition-colors duration-300">
                <item.icon className="text-amber-400" size={22} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
