import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const ImpactWidget: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Calculate live values based on elapsed time since Jan 1, 2026
  const getInitialStats = () => {
    const baseDate = new Date('2026-01-01T00:00:00Z').getTime();
    const now = Date.now();
    const elapsedSeconds = Math.max(0, (now - baseDate) / 1000);

    // Baseline scaling rates:
    // Waste: ~100 tons base + 0.0001 tons per second (approx 3,150 tons per year)
    // CO2 Offset: ~250 kg base + 0.005 kg per second (approx 157,000 kg per year)
    // Devices Recovered: ~500 units base + 0.0015 devices per second (approx 47,000 devices per year)
    return {
      waste: Math.floor(100 + elapsedSeconds * 0.0001),
      co2: Math.floor(250 + elapsedSeconds * 0.005),
      devices: Math.floor(500 + elapsedSeconds * 0.0015)
    };
  };

  const finalStats = useRef(getInitialStats());
  const [currentStats, setCurrentStats] = useState({
    waste: shouldReduceMotion ? finalStats.current.waste : 0,
    co2: shouldReduceMotion ? finalStats.current.co2 : 0,
    devices: shouldReduceMotion ? finalStats.current.devices : 0
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  // Count up animation on viewport entry
  useEffect(() => {
    if (!isInView || hasAnimated || shouldReduceMotion) return;

    setHasAnimated(true);
    const duration = 2000; // 2 seconds count-up
    const steps = 50;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easedProgress = progress * (2 - progress); // Ease out quad

      setCurrentStats({
        waste: Math.floor(finalStats.current.waste * easedProgress),
        co2: Math.floor(finalStats.current.co2 * easedProgress),
        devices: Math.floor(finalStats.current.devices * easedProgress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setCurrentStats(finalStats.current);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isInView, hasAnimated, shouldReduceMotion]);

  // Live updates simulator: ticking every 3 seconds
  useEffect(() => {
    if (!shouldReduceMotion && !hasAnimated) return;

    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        waste: prev.waste + Math.floor(Math.random() * 2),
        co2: prev.co2 + Math.floor(Math.random() * 5),
        devices: prev.devices + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [hasAnimated, shouldReduceMotion]);

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
            <Terminal className="text-amber-400" size={20} />
            <span className="text-gray-400 text-xs">system_impact_monitor --live</span>
            <div className="flex space-x-1 ml-auto">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1">
              <div className="text-amber-400 text-xs uppercase tracking-widest">E-Waste Processed</div>
              <div className="text-3xl text-white font-bold">{currentStats.waste.toLocaleString()} <span className="text-xs text-gray-500">TONS</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-blue-400 text-xs uppercase tracking-widest">CO2 Offset</div>
              <div className="text-3xl text-white font-bold">{currentStats.co2.toLocaleString()} <span className="text-xs text-gray-500">KG</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-emerald-400 text-xs uppercase tracking-widest">Devices Recovered</div>
              <div className="text-3xl text-white font-bold">{currentStats.devices.toLocaleString()} <span className="text-xs text-gray-500">UNITS</span></div>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-gray-600 animate-pulse">
            [OK] DATA_SYNC_ACTIVE ... PUSHING_TO_GLOBAL_REGISTRY ...
          </div>
        </motion.div>
      </div>
    </section>
  );
};