import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bell, KeyRound, Users, MessageSquare, GitBranch, Clock } from 'lucide-react';

const problems = [
  { icon: Bell, title: 'Alert overload', description: 'Critical alerts buried in noise.' },
  { icon: KeyRound, title: 'Manual resets', description: 'IT stuck on repetitive access requests.' },
  { icon: Users, title: 'Fragmented onboarding', description: 'New starter tasks scattered across systems.' },
  { icon: MessageSquare, title: 'Repeated questions', description: 'Staff waiting for answers docs already have.' },
  { icon: GitBranch, title: 'Disconnected systems', description: 'Tools that don\'t talk — manual data entry.' },
  { icon: Clock, title: 'Slow escalation', description: 'No clear path from alert to right person.' },
];

export const Problems: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  };

  const cardVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' } },
  };

  return (
    <section className="py-24 bg-gray-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Pain Points</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Is Manual IT{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Slowing You Down?</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 max-w-xl mx-auto"
          >
            We automate the repetitive, high-friction work that frustrates your team.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              className="bg-[#0B1120] border border-white/5 hover:border-amber-400/20 rounded-2xl p-6 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4 group-hover:bg-amber-400/15 transition-colors duration-300">
                <problem.icon className="text-amber-400" size={20} />
              </div>
              <h3 className="text-white font-bold text-base mb-1">{problem.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-12 border border-amber-400/30 bg-amber-400/5 rounded-2xl px-8 py-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-amber-300 text-sm font-medium leading-relaxed">
            "If it's repetitive, rules-based, or involves copying data between systems — it can be automated."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
