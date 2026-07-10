import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bell, KeyRound, Users, MessageSquare, GitBranch, Clock } from 'lucide-react';

const problems = [
  {
    icon: Bell,
    title: 'Alert overload',
    description: 'Critical monitoring alerts buried in inboxes or Teams channels, mixed with noise that nobody acts on.'
  },
  {
    icon: KeyRound,
    title: 'Manual password resets',
    description: 'IT staff spending time on repetitive access and reset requests that could be handled automatically.'
  },
  {
    icon: Users,
    title: 'Fragmented onboarding',
    description: 'New starter tasks spread across email threads, spreadsheets, and disconnected systems.'
  },
  {
    icon: MessageSquare,
    title: 'Repeated support questions',
    description: 'Staff searching through outdated documents or waiting for answers that a knowledge assistant could provide instantly.'
  },
  {
    icon: GitBranch,
    title: 'Disconnected systems',
    description: "Teams, Azure, email, ticketing, and HR platforms that don't talk to each other — creating manual data entry."
  },
  {
    icon: Clock,
    title: 'Slow incident escalation',
    description: 'No clear path from an alert firing to the right person being notified with the right information.'
  }
];

export const Problems: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' } }
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
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Common Pain Points</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Is Manual IT Work{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Slowing Your Team Down?</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            We help businesses automate repetitive, high-friction processes — starting with the ones that frustrate your team the most.
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
              className="bg-[#0B1120] border border-white/5 hover:border-amber-400/20 rounded-2xl p-7 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-5 group-hover:bg-amber-400/15 transition-colors duration-300">
                <problem.icon className="text-amber-400" size={22} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{problem.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.4 }}
          className="mt-12 border border-amber-400/30 bg-amber-400/5 rounded-2xl px-8 py-6 text-center max-w-3xl mx-auto"
        >
          <p className="text-amber-300 text-base font-medium leading-relaxed">
            "If a process is repetitive, rules-based, or depends on copying information between systems — it can almost certainly be automated."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
