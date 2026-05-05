import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
            <Globe className="text-amber-400 mr-2" size={16} />
            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">About Us</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Pioneering <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Sustainable Innovation</span>
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              At Gauntlet Group, we bridge the gap between cutting-edge technology and environmental responsibility. 
              Our mission is to empower businesses with innovative tech solutions while ensuring sustainable practices 
              through comprehensive WEEE recycling and compliance services.
            </p>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              With deep expertise in WEEE directives and seamless tech integration, we help organizations build 
              a sustainable future without compromising on innovation. Our certified professionals ensure your 
              business stays compliant while maximizing technological potential.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
