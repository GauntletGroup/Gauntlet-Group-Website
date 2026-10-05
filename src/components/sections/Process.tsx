import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, GitBranch, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Discovery and scope.', description: 'Understand the current process, identify the friction, and agree the scope.' },
  { icon: GitBranch, title: 'Build and integrate.', description: 'Connect the relevant systems and build the workflow in your environment.' },
  { icon: CheckCircle2, title: 'Test and hand over.', description: 'Test the workflow, document it, and hand over ownership of what was built.' },
];

export const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 bg-black relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/60 to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-[#151B28] border border-amber-500/30 rounded-full px-5 py-2 mb-5">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Our Process</span>
          </div>
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            A clear path from{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">problem to workflow</span>
          </motion.h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">A focused, practical process built around your existing systems and priorities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.12 }}
                className="relative bg-[#0B1120] border border-white/10 rounded-3xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <Icon className="text-amber-400" size={23} />
                  </div>
                  <span className="text-amber-400/70 text-xs font-semibold tracking-widest">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
                {index < steps.length - 1 && <ArrowRight className="hidden md:block absolute -right-4 top-12 text-gray-600 bg-black rounded-full p-1" size={28} aria-hidden="true" />}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 max-w-3xl mx-auto text-center border border-amber-400/30 bg-amber-400/5 rounded-3xl px-6 py-7">
          <p className="text-white font-semibold">See what your automation opportunity could look like.</p>
          <p className="text-gray-300 text-sm mt-2">Book a free review to map the workflow, scope the integrations, and identify the best next step.</p>
          <a href="#book-call" className="inline-flex items-center gap-2 mt-5 text-amber-400 hover:text-amber-300 font-bold text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
            Book a Free Automation Review <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
