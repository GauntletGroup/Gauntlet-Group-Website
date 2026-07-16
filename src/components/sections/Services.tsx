import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Headphones, Users, MessageSquare, GitBranch, Recycle, ArrowRight, Zap } from 'lucide-react';

interface Service {
  icon: any;
  title: string;
  description: string;
  accent: 'amber' | 'blue' | 'emerald';
  featured?: boolean;
  badge?: string;
  delay: number;
}

interface ServicesProps {
  onServiceClick: (title: string) => void;
}

const services: Service[] = [
  {
    icon: Activity,
    title: 'AI Alert Triage & Incident Escalation',
    description: 'Turn technical monitoring alerts into plain-English summaries. Classify urgency, suppress noise, and automatically notify the right people through Teams, Slack, email, or your ticketing system.',
    accent: 'amber',
    featured: true,
    badge: 'Featured Automation',
    delay: 0.1
  },
  {
    icon: Headphones,
    title: 'IT Helpdesk Automation',
    description: 'Automate repetitive support tasks — password resets, ticket classification, access requests, and employee self-service — reducing load on IT teams and improving response times.',
    accent: 'amber',
    delay: 0.2
  },
  {
    icon: Users,
    title: 'Employee Onboarding Automation',
    description: 'Coordinate accounts, system access, equipment, notifications, and welcome tasks for new starters automatically — no more manual chasing across email and spreadsheets.',
    accent: 'amber',
    delay: 0.3
  },
  {
    icon: MessageSquare,
    title: 'AI Knowledge & Support Assistants',
    description: 'Give staff or customers fast, accurate answers drawn from your own documentation, policies, and knowledge base — available 24/7 without extra headcount.',
    accent: 'blue',
    delay: 0.4
  },
  {
    icon: GitBranch,
    title: 'Custom Workflow Automation',
    description: 'Connect your existing apps and eliminate repetitive steps across IT, operations, sales, and support. If it involves copying data or waiting for a human to trigger the next step — we can automate it.',
    accent: 'blue',
    delay: 0.5
  },
  {
    icon: Recycle,
    title: 'WEEE & IT Asset Lifecycle Services',
    description: 'Responsible collection, reuse, recycling, and data-secure disposal of IT equipment. Certified, zero-cost logistics for qualifying assets. Helping organisations manage the full technology lifecycle sustainably.',
    accent: 'emerald',
    delay: 0.6
  }
];

export const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const shouldReduceMotion = useReducedMotion();

  const accentClasses = {
    amber: {
      icon: 'text-amber-400 border-amber-400/20 bg-amber-400/5 group-hover:border-amber-400/50',
      glow: 'bg-gradient-to-br from-amber-500/5 to-transparent',
      text: 'text-amber-400 group-hover:text-amber-300',
      border: 'hover:border-amber-400/30'
    },
    blue: {
      icon: 'text-blue-400 border-blue-400/20 bg-blue-400/5 group-hover:border-blue-400/50',
      glow: 'bg-gradient-to-br from-blue-500/5 to-transparent',
      text: 'text-blue-400 group-hover:text-blue-300',
      border: 'hover:border-blue-400/30'
    },
    emerald: {
      icon: 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5 group-hover:border-emerald-400/50',
      glow: 'bg-gradient-to-br from-emerald-500/5 to-transparent',
      text: 'text-emerald-400 group-hover:text-emerald-300',
      border: 'hover:border-emerald-400/30'
    }
  };

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/50 border border-amber-500/30 rounded-full px-6 py-2 mb-8"
          >
            <Zap className="text-amber-400 mr-2" size={16} />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">What We Automate</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Automation &amp;{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">AI Services</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Practical, proven automations built for growing businesses and SaaS teams.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const ac = accentClasses[service.accent];
            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : service.delay }}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                onClick={() => onServiceClick(service.title)}
                className={`group bg-[#0B1120] p-8 rounded-3xl border relative overflow-hidden cursor-pointer transition-all duration-500 ${
                  service.featured
                    ? 'border-amber-400/30 shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)]'
                    : `border-white/5 ${ac.border}`
                }`}
              >
                {/* Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${ac.glow}`} />

                {/* Featured badge */}
                {service.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="bg-amber-400/15 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-400/30 uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-500 ${ac.icon}`}>
                  <service.icon size={28} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 pr-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-relaxed mb-6 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>

                <div className={`flex items-center font-semibold text-sm transition-all duration-300 ${ac.text}`}>
                  Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={15} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
