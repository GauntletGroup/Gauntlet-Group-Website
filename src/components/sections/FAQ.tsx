import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Zap, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

const faqs = [
  {
    q: "Do I need to replace the tools my business already uses?",
    a: "No. We build automations that connect the tools you already have — Microsoft 365, Teams, Azure, Slack, Google Workspace, and more. Nothing gets ripped out. We slot in around your existing stack."
  },
  {
    q: "Is this secure? Who holds our credentials?",
    a: "You do. Every automation we build uses your own Azure app registrations, API keys, and credentials — scoped with least-privilege access. Nothing is stored in our systems. You own and control everything from day one."
  },
  {
    q: "How quickly can you deliver a working automation?",
    a: "Most pilots are delivered within 48 hours to 2 weeks depending on complexity. We start with one workflow, prove the value, then scale from there."
  },
  {
    q: "What if I'm not sure what to automate?",
    a: "That's exactly what the free automation review is for. We'll ask you about your biggest repetitive pain points and recommend the highest-impact starting point — no commitment required."
  },
  {
    q: "Do you only work with businesses in Peterborough?",
    a: "No — we work remotely with businesses across the UK. Location is no barrier."
  },
  {
    q: "What happens after the pilot?",
    a: "You get the workflow, the documentation, and full ownership. If you want ongoing support, monitoring, or additional automations, we offer retainer packages — but there's no obligation."
  },
  {
    q: "How much does it cost?",
    a: "Pricing depends on the complexity and number of workflows. The initial automation review is completely free. We'll give you a clear fixed-price quote before any work begins — no surprises."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <Zap className="text-amber-400 mr-2" size={14} />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Common Questions</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Got Questions?{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">We Have Answers.</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know before booking your free automation review.
          </motion.p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-white/10">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
              >
                <span className="text-white font-semibold text-lg pr-4 group-hover:text-amber-400 transition-colors duration-200">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
                  className="shrink-0"
                >
                  <ChevronDown className="text-amber-400" size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="answer"
                    initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 leading-relaxed pt-1 pb-5">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <Button variant="primary" onClick={handleContactClick}>
            <span className="flex items-center gap-2">
              Talk to Us
              <ArrowRight size={16} />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
