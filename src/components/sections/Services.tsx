import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Headphones, MessageSquare, KeyRound, UserPlus, Activity,
  Recycle, ShieldCheck, Laptop, ArrowRight, Zap, Leaf
} from 'lucide-react';

interface ServicesProps {
  onServiceClick: (title: string) => void;
}

const aiServices = [
  { icon: Headphones, title: 'AI Helpdesk Chatbot', desc: 'Instant Teams answers, 24/7. Fewer tickets, happier employees.', modalTitle: 'IT Helpdesk Automation', delay: 0.05 },
  { icon: MessageSquare, title: 'AI Knowledge Assistant (RAG)', desc: 'Turns your documents into instant, accurate answers.', modalTitle: 'AI Knowledge & Support Assistants', delay: 0.1 },
  { icon: KeyRound, title: 'Password Reset Automation', desc: 'Self-service resets in seconds, zero IT tickets.', modalTitle: 'IT Helpdesk Automation', delay: 0.15 },
  { icon: UserPlus, title: 'Employee Onboarding Automation', desc: 'New starters set up automatically, day one.', modalTitle: 'Employee Onboarding Automation', delay: 0.2 },
  { icon: Activity, title: 'IT Monitoring & Alerts', desc: 'Problems flagged before your team even notices.', modalTitle: 'AI Alert Triage & Incident Escalation', delay: 0.25 },
];

const sustainableServices = [
  { icon: Recycle, title: 'WEEE Waste Management', desc: 'Compliant e-waste collection and recycling.', modalTitle: 'WEEE & IT Asset Lifecycle Services' },
  { icon: ShieldCheck, title: 'Compliance Advisory', desc: 'Stay ahead of environmental regulations.', modalTitle: 'WEEE & IT Asset Lifecycle Services' },
  { icon: Laptop, title: 'Tech Consulting', desc: 'Modernize your IT stack, securely.', modalTitle: 'Custom Workflow Automation' },
];

export const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/50 border border-cyan-500/30 rounded-full px-6 py-2 mb-6"
          >
            <Zap className="text-cyan-400 mr-2" size={16} />
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">What We Do</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            AI &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Automation Services</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Practical automations that run your busywork — so your team doesn't have to.
          </motion.p>
        </div>

        {/* Group 1: AI & Automation — prominent full-width grid */}
        <div className="mb-20">
          <motion.h3
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <span className="w-1 h-6 bg-cyan-400 rounded-full" />
            AI &amp; Automation
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service, i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : service.delay }}
                whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.02 }}
                onClick={() => onServiceClick(service.modalTitle)}
                className="group bg-[#0B1120] p-7 rounded-3xl border border-white/5 hover:border-cyan-400/40 relative overflow-hidden cursor-pointer transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border border-cyan-400/20 bg-cyan-400/5 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-500">
                    <service.icon className="text-cyan-400" size={26} />
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors duration-300">
                    {service.desc}
                  </p>

                  <div className="flex items-center font-semibold text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                    Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={15} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Group 2: Sustainable Tech — compact strip */}
        <div>
          <motion.h3
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-lg font-bold text-gray-400 mb-6 flex items-center gap-3"
          >
            <span className="w-1 h-5 bg-emerald-400 rounded-full" />
            Sustainable Tech Services
            <Leaf className="text-emerald-400/50" size={16} />
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sustainableServices.map((service, i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                onClick={() => onServiceClick(service.modalTitle)}
                className="group bg-gray-900/50 p-5 rounded-2xl border border-white/5 hover:border-emerald-400/30 relative overflow-hidden cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border border-emerald-400/20 bg-emerald-400/5 group-hover:border-emerald-400/40 transition-all duration-300 shrink-0">
                    <service.icon className="text-emerald-400" size={20} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
