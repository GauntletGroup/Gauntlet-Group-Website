import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const techStack = [
  'Microsoft 365',
  'Azure',
  'n8n',
  'Google Gemini',
  'Supabase',
  'Slack',
  'Teams',
  'Outlook',
];

export const TechStackStrip: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const items = [...techStack, ...techStack, ...techStack];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] uppercase tracking-[0.3em] text-gray-600"
        >
          Built on the tools you already use
        </motion.p>
      </div>

      <div className="relative">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: `marquee-scroll ${shouldReduceMotion ? 0 : 40}s linear infinite`,
          }}
        >
          {items.map((tech, i) => (
            <span
              key={i}
              className="flex items-center text-2xl md:text-4xl font-extrabold font-display text-gray-800 hover:text-amber-400 transition-colors duration-300 cursor-default"
            >
              <span className="px-8">{tech}</span>
              <span className="text-amber-400/20 text-3xl">/</span>
            </span>
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
