import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export const ImpactWidget: React.FC = () => {
  const [stats, setStats] = useState({
    waste: 0,
    co2: 0,
    devices: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        waste: prev.waste + Math.floor(Math.random() * 2),
        co2: prev.co2 + Math.floor(Math.random() * 5),
        devices: prev.devices + Math.floor(Math.random() * 3)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
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
              <div className="text-3xl text-white font-bold">{stats.waste.toLocaleString()} <span className="text-xs text-gray-500">TONS</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-blue-400 text-xs uppercase tracking-widest">CO2 Offset</div>
              <div className="text-3xl text-white font-bold">{stats.co2.toLocaleString()} <span className="text-xs text-gray-500">KG</span></div>
            </div>
            <div className="space-y-1">
              <div className="text-emerald-400 text-xs uppercase tracking-widest">Devices Recovered</div>
              <div className="text-3xl text-white font-bold">{stats.devices.toLocaleString()} <span className="text-xs text-gray-500">UNITS</span></div>
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
