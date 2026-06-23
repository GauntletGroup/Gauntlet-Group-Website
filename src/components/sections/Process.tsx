import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Truck, ShieldCheck, Recycle, Leaf } from 'lucide-react';

export const Process: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const steps = [
    { icon: Truck, title: 'Secure Collection', description: 'Nationwide pickup using tracked vehicles and vetted staff.' },
    { icon: ShieldCheck, title: 'Data Destruction', description: 'Full data sanitization with certificates of destruction.' },
    { icon: Recycle, title: 'Sustainable Processing', description: 'Components are recovered or recycled with zero-to-landfill policy.' },
    { icon: Leaf, title: 'Circular Economy', description: 'Refurbished assets find new life, closing the technology loop.' }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Sustainability Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">How we manage your technology lifecycle responsibly.</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          {!shouldReduceMotion && (
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 hidden lg:block -translate-y-1/2" />
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : index * 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 bg-gray-900 border-4 border-gray-800 rounded-full flex items-center justify-center mb-6 group-hover:border-amber-400/50 transition-colors duration-500 bg-black relative">
                  <step.icon className="text-amber-400" size={32} />
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-black text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};