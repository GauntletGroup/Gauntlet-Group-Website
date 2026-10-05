import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, AlertCircle, Clock } from 'lucide-react';
import { useCalendlyScript } from '../../hooks/useCalendlyScript';

interface BookCallProps {
  prefill?: {
    name?: string;
    email?: string;
    company?: string;
    contactNumber?: string;
  };
}

export const BookCall: React.FC<BookCallProps> = ({ prefill }) => {
  const scriptLoaded = useCalendlyScript();
  const containerRef = useRef<HTMLDivElement>(null);
  const [initFailed, setInitFailed] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/imran-ishaq-gauntlet-group/30min';

  useEffect(() => {
    let active = true;
    let fallbackTimeoutId: ReturnType<typeof setTimeout> | undefined;
    let renderTimeoutId: ReturnType<typeof setTimeout> | undefined;

    if (scriptLoaded && window.Calendly && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        const queryParams = new URLSearchParams({
          background_color: '0b1120',
          text_color: 'ffffff',
          primary_color: 'f59e0b',
          hide_landing_page_details: '1',
          hide_gdpr_banner: '1',
        });
        window.Calendly.initInlineWidget({
          url: `${CALENDLY_URL}?${queryParams.toString()}`,
          parentElement: containerRef.current,
          prefill: prefill ? {
            name: prefill.name,
            email: prefill.email,
            customAnswers: { a1: prefill.company || '', a2: prefill.contactNumber || '' },
          } : undefined,
        });
        renderTimeoutId = setTimeout(() => { if (active) setIsInitializing(false); }, 1500);
      } catch {
        if (active) { setInitFailed(true); setIsInitializing(false); }
      }
    } else {
      fallbackTimeoutId = setTimeout(() => {
        if (active) { setInitFailed(true); setIsInitializing(false); }
      }, 10000);
    }

    return () => {
      active = false;
      if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
      if (renderTimeoutId) clearTimeout(renderTimeoutId);
    };
  }, [scriptLoaded, CALENDLY_URL, prefill]);

  return (
    <section id="book-call" className="py-24 bg-black relative overflow-hidden border-t border-white/10 scroll-mt-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#151B28] border border-amber-500/30 rounded-full px-5 py-2 mb-5">
            <Calendar className="text-amber-400 mr-2" size={14} />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Schedule Instantly</span>
          </div>
          <motion.h2 initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Book a Free <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Automation Review</span>
          </motion.h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">30 minutes to discuss your current process and where automation could help.</p>

          <div className="flex justify-center mt-8">
            <div className="flex items-start gap-3 bg-[#0B1120] border border-white/10 rounded-2xl px-5 py-4 max-w-md text-left">
              <Clock className="text-amber-400 shrink-0 mt-0.5" size={18} />
              <div>
                <div className="text-white text-sm font-bold">30 minutes</div>
                <div className="text-gray-300 text-xs mt-1 leading-relaxed">Discuss your current process and where automation could help.</div>
              </div>
            </div>
          </div>
        </div>

        <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative max-w-4xl mx-auto bg-[#0B1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          {isInitializing && !initFailed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B1120] space-y-6" aria-label="Loading booking calendar" aria-live="polite">
              <div className="w-12 h-12 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
              <span className="text-gray-300 text-sm">Loading booking calendar...</span>
            </div>
          )}
          {initFailed && (
            <div className="p-12 text-center flex flex-col items-center justify-center bg-[#0B1120] text-white space-y-6 min-h-[500px]">
              <AlertCircle className="text-amber-400 w-14 h-14" />
              <h3 className="text-2xl font-bold">Booking calendar could not load.</h3>
              <p className="text-gray-300 max-w-md text-sm">You can open it directly below.</p>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="bg-amber-400 text-black font-bold px-8 py-4 rounded-full hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors">
                Open booking calendar
              </a>
            </div>
          )}
          <div id="calendly-inline-embed" ref={containerRef} className="w-full h-[700px] md:h-[720px] bg-[#0B1120]" style={{ display: initFailed ? 'none' : 'block' }} />
        </motion.div>
      </div>
    </section>
  );
};
