import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';

const n8nCertifications = [
  { src: '/n8n101.png', alt: 'n8n Essentials: Your First Workflows certification' },
  { src: '/n8n102.png', alt: 'n8n Integrations: APIs & Connected certification' },
  { src: '/n8n103.png', alt: 'n8n In Practice: AI, Testing & Best Practices certification' },
];

export const Certifications: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-slate-950 py-20" aria-labelledby="certifications-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.08),transparent_35%),radial-gradient(circle_at_85%_75%,rgba(14,116,144,0.12),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-2xl"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-400">Trusted expertise</p>
          <h2 id="certifications-heading" className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Certifications &amp; compliance
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Practical automation expertise backed by recognised n8n training and rigorous information privacy standards.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 md:p-8"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-400/25 bg-amber-400/10 text-amber-400">
                <Award size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">n8n certifications</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">Certified knowledge across workflow design, integrations, and best practices.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {n8nCertifications.map((certification) => (
                <div key={certification.src} className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 transition duration-300 hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/5">
                  <img src={certification.src} alt={certification.alt} className="aspect-square w-full object-contain p-2" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 md:p-8"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">ISO certifications</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">A clear commitment to information security and privacy-led delivery.</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white p-3">
              <img src="/ISO27701COMBINED.jpg" alt="ISO 27701 and related ISO certification marks" className="h-48 w-full object-contain sm:h-56" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
