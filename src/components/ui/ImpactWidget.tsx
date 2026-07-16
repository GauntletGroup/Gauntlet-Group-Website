import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Terminal, Zap, Clock, Shield } from 'lucide-react';

export const ImpactWidget: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    { icon: Clock, label: 'Avg. workflow runtime', value: 3, suffix: ' sec', color: 'amber' },
    { icon: Zap, label: 'Manual steps eliminated', value: 5, suffix: ' per workflow', color: 'blue' },
    { icon: Shield, label: 'IT tickets avoided', value: 100, suffix: '%', color: 'emerald' },
  ];

  const [displayValues, setDisplayValues] = useState(stats.map(() => 0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayValues(stats.map(s => s.value));
      return;
    }
    hasAnimated.current = true;

    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = progress * (2 - progress);

      setDisplayValues(stats.map(s => Math.floor(s.value * eased)));

      if (currentStep >= steps) {
        clearInterval(interval);
        setDisplayValues(stats.map(s => s.value));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion]);

  const colorClasses = {
    amber: 'text-amber-400',
    blue: 'text-blue-400',
    emerald: 'text-emerald-400',
  };

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 border border-amber-400/20 rounded-2xl p-6 font-mono overflow-hidden relative"
        >
          <div className="flex items-center space-x-2 mb-6 border-b border-gray-800 pb-4">
            <Terminal className="text-amber-400" size={18} />
            <span className="text-gray-400 text-xs">automation_impact --live</span>
            <div className="flex space-x-1 ml-auto">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={colorClasses[stat.color as keyof typeof colorClasses]} />
                    <span className={`${colorClasses[stat.color as keyof typeof colorClasses]} text-xs uppercase tracking-widest`}>
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-3xl text-white font-bold">
                    {displayValues[i]}
                    <span className="text-xs text-gray-500 ml-1">{stat.suffix}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-[10px] text-gray-600 animate-pulse">
            [OK] AUTOMATION_ACTIVE ... MONITORING_WORKFLOWS ...
          </div>
        </motion.div>
      </div>
    </section>
  );
};
