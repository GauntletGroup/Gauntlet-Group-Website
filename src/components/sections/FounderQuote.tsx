import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Shield } from 'lucide-react';

export const FounderQuote: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Founder placeholder — icon for now, designed to swap for a photo */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div className="w-28 h-28 rounded-full border-2 border-amber-400/30 flex items-center justify-center bg-gradient-to-br from-amber-400/10 to-transparent">
              <Shield className="text-amber-400/60" size={48} strokeWidth={1} />
            </div>
            <div className="absolute inset-0 rounded-full border border-amber-400/10 animate-pulse-slow" />
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: shouldReduceMotion ? 0 : 0.2, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-6">
            Message from Gauntlet
          </p>

          <blockquote className="text-2xl md:text-4xl font-display font-medium text-white leading-snug tracking-tight">
            "We don't sell AI for the sake of it. We find the one workflow
            draining your team's time, automate it, and hand you the keys.
            <span className="text-amber-400"> Everything we build is yours to keep.</span>"
          </blockquote>

          <div className="mt-8 flex flex-col items-center gap-1">
            <span className="text-white font-semibold text-sm">Imran Ishaq</span>
            <span className="text-gray-500 text-xs">Founder, Gauntlet Group</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
