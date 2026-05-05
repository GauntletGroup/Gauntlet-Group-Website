import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Recycle, Shield, ArrowRight, Database } from 'lucide-react';

interface Service {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
}

interface ServicesProps {
  onServiceClick: (title: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onServiceClick }) => {
  const services: Service[] = [
    {
      icon: Monitor,
      title: 'Tech Consulting',
      description: 'Drive digital transformation with our expert IT infrastructure services. We help businesses modernize their technology stack while maintaining optimal performance and security.',
      color: 'amber',
      delay: 0.2
    },
    {
      icon: Recycle,
      title: 'WEEE Waste Management',
      description: 'Comprehensive collection, recycling, and compliance services for electronic waste. Ensure responsible disposal while meeting all regulatory requirements.',
      color: 'emerald',
      delay: 0.4
    },
    {
      icon: Shield,
      title: 'Compliance Advisory',
      description: 'Navigate complex environmental regulations with confidence. Our experts help companies achieve and maintain compliance with WEEE directives and sustainability standards.',
      color: 'blue',
      delay: 0.6
    }
  ];

  return (
    <section id="services" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8"
          >
            <Database className="text-amber-400 mr-2" size={16} />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Our Services</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Comprehensive <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Tech Solutions</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Empowering your business through technological excellence and environmental stewardship.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colors = {
              'Tech Consulting': 'text-amber-400 border-amber-400/20 bg-amber-400/5 group-hover:border-amber-400/50',
              'WEEE Waste Management': 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5 group-hover:border-emerald-400/50',
              'Compliance Advisory': 'text-white border-white/10 bg-white/5 group-hover:border-white/30'
            };
            const colorClass = colors[service.title as keyof typeof colors] || 'text-amber-400 border-white/10';

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay }}
                whileHover={{ y: -10 }}
                className="group bg-[#0B1120] p-8 rounded-3xl border border-white/5 relative overflow-hidden cursor-pointer transition-all duration-500"
                onClick={() => onServiceClick(service.title)}
              >
                {/* Dynamic Gradient Glow on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                  ${service.title === 'Tech Consulting' ? 'bg-gradient-to-br from-amber-500/5 to-transparent' : ''}
                  ${service.title === 'WEEE Waste Management' ? 'bg-gradient-to-br from-emerald-500/5 to-transparent' : ''}
                  ${service.title === 'Compliance Advisory' ? 'bg-gradient-to-br from-white/5 to-transparent' : ''}
                `} />
                
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 border transition-all duration-500 ${colorClass}`}>
                  <service.icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed mb-8 group-hover:text-gray-300 transition-colors duration-300">
                  {service.description}
                </p>
                
                <div className={`flex items-center font-semibold text-sm transition-all duration-300 
                  ${service.title === 'Tech Consulting' ? 'text-amber-400 group-hover:text-amber-300' : ''}
                  ${service.title === 'WEEE Waste Management' ? 'text-emerald-400 group-hover:text-emerald-300' : ''}
                  ${service.title === 'Compliance Advisory' ? 'text-white group-hover:text-gray-300' : ''}
                `}>
                  Learn More <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
