import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, AlertCircle, Clock, Zap, CheckCircle } from 'lucide-react';
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

  // Read Calendly URL from Vite env, fallback to gauntlet group's official link
  const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/imran-ishaq-gauntlet-group/30min';

  useEffect(() => {
    let active = true;
    let fallbackTimeoutId: NodeJS.Timeout;
    let renderTimeoutId: NodeJS.Timeout;

    if (scriptLoaded && window.Calendly && containerRef.current) {
      try {
        containerRef.current.innerHTML = ''; // Clear previous contents before rendering

        // Construct parameterized URL for consistent styling and format
        const queryParams = new URLSearchParams({
          background_color: '0b1120', // Matches deep dark cardbg #0B1120
          text_color: 'ffffff',       // White text
          primary_color: 'f59e0b',    // Premium gold accent #F59E0B
          hide_landing_page_details: '1',
          hide_gdpr_banner: '1',
        });
        const urlWithParams = `${CALENDLY_URL}?${queryParams.toString()}`;

        window.Calendly.initInlineWidget({
          url: urlWithParams,
          parentElement: containerRef.current,
          prefill: prefill ? {
            name: prefill.name,
            email: prefill.email,
            customAnswers: {
              a1: prefill.company || '',
              a2: prefill.contactNumber || ''
            }
          } : undefined
        });

        // Small delay to allow the Calendly iframe to start loading before fading loader out
        renderTimeoutId = setTimeout(() => {
          if (active) {
            setIsInitializing(false);
          }
        }, 1500);
      } catch (err) {
        console.error('Failed to initialize Calendly inline widget:', err);
        if (active) {
          setInitFailed(true);
          setIsInitializing(false);
        }
      }
    } else {
      // Set a timeout to show fallback if script doesn't load within 10 seconds
      fallbackTimeoutId = setTimeout(() => {
        if (active) {
          setInitFailed(true);
          setIsInitializing(false);
        }
      }, 10000);
    }

    return () => {
      active = false;
      if (fallbackTimeoutId) clearTimeout(fallbackTimeoutId);
      if (renderTimeoutId) clearTimeout(renderTimeoutId);
    };
  }, [scriptLoaded, CALENDLY_URL, prefill]);

  return (
    <section id="book-call" className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <Calendar className="text-amber-400 mr-2" size={16} />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Schedule Instantly</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-display"
          >
            Book a Free 20-Minute{' '}
            <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-blue-500 bg-clip-text text-transparent">Automation Review</span>
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg mb-10"
          >
            Tell us about your current IT processes and we will identify where automation can save your team the most time. No commitment, no pressure — just a practical conversation.
          </motion.p>

          {/* Benefit tiles */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-4"
          >
            {[
              { icon: Clock, label: '20 minutes', sub: 'A focused, structured conversation — not a sales pitch.' },
              { icon: Zap, label: 'Same-week availability', sub: 'We aim to book within 3–5 working days.' },
              { icon: CheckCircle, label: 'Actionable output', sub: 'You will leave with at least one clear automation recommendation.' }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-800/30 border border-white/5 rounded-2xl px-5 py-4 max-w-xs text-left">
                <item.icon className="text-amber-400 shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="text-white text-sm font-bold">{item.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5 leading-snug">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Container for Calendly Widget */}
        <motion.div 
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="relative max-w-4xl mx-auto bg-[#0B1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >

          {/* Skeleton Shimmer Loader */}
          {isInitializing && !initFailed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0B1120] space-y-6">
              <div className="w-16 h-16 border-4 border-amber-400/20 border-t-amber-400 rounded-full animate-spin" />
              <div className="space-y-3 w-64 text-center">
                <div className="h-4 bg-gray-800 rounded-full w-3/4 mx-auto animate-pulse" />
                <div className="h-3 bg-gray-800 rounded-full w-1/2 mx-auto animate-pulse" />
              </div>
            </div>
          )}

          {/* Adblocker or Script Failure State */}
          {initFailed && (
            <div className="p-12 text-center flex flex-col items-center justify-center bg-[#0B1120] text-white space-y-6 min-h-[600px]">
              <AlertCircle className="text-red-400 w-16 h-16 animate-bounce" />
              <h3 className="text-2xl font-bold">Booking calendar is blocked</h3>
              <p className="text-gray-400 max-w-md">
                It seems Calendly cannot load. This is usually caused by browser adblockers or security extensions. You can still schedule by clicking the link below:
              </p>
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-amber-500 to-blue-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:from-amber-400 hover:to-blue-600 transition-all transform hover:scale-105"
              >
                Book Your Free Review
              </a>
            </div>
          )}

          {/* Anchor point where Calendly loads */}
          <div 
            id="calendly-inline-embed"
            ref={containerRef}
            className="w-full h-[700px] md:h-[720px] bg-[#0B1120]"
            style={{ display: initFailed ? 'none' : 'block' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
