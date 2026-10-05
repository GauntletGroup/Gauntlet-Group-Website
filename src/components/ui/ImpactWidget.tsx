import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bell, GitBranch, CheckCircle2 } from 'lucide-react';

const stages = [
  { icon: Bell, title: 'Capture', description: 'Start with a request, alert or scheduled task.', colour: 'text-amber-400 border-amber-400/30 bg-amber-400/10' },
  { icon: GitBranch, title: 'Process', description: 'Connect the relevant systems and apply the agreed workflow.', colour: 'text-blue-400 border-blue-400/30 bg-blue-400/10' },
  { icon: CheckCircle2, title: 'Notify', description: 'Send updates and record the outcome.', colour: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10' },
];

export const ImpactWidget: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-16 bg-[#0B1120] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-[0.2em] mb-3">A practical starting point</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">From manual task to connected workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.title} className="relative flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-3 p-5 md:p-6 bg-black/20 border border-white/5 first:rounded-2xl md:first:rounded-l-2xl md:first:rounded-r-none last:rounded-2xl md:last:rounded-r-2xl md:last:rounded-l-none">
                  <div className={`w-12 h-12 shrink-0 rounded-2xl border flex items-center justify-center ${stage.colour}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base mb-1">{stage.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{stage.description}</p>
                  </div>
                  {index < stages.length - 1 && <div className="hidden md:block absolute top-12 -right-2 w-4 h-px bg-white/20" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
