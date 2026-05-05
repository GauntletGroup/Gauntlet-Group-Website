import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Users, Award, Cpu } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const items = [
    { icon: CheckCircle, title: '100% WEEE Compliant', description: 'Fully compliant processes ensuring your business meets all environmental regulations and standards.', color: 'amber' },
    { icon: Leaf, title: 'Sustainable IT Practices', description: 'Environmentally conscious technology solutions that reduce carbon footprint and promote circular economy.', color: 'green' },
    { icon: Users, title: 'Scalable Solutions', description: 'Flexible services that grow with your business, from startups to enterprise-level organizations.', color: 'blue' },
    { icon: Award, title: 'Certified Professionals', description: 'Experienced team of certified experts dedicated to delivering exceptional results and ongoing support.', color: 'purple' }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-[#0B1120] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Why Choose Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Empowering your business through technology and sustainability
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-10 flex flex-col items-center text-center relative
                ${index !== items.length - 1 ? 'lg:border-r lg:border-white/10' : ''}
                ${index % 2 !== 0 ? 'md:border-r lg:border-r-0 md:border-white/0' : 'md:border-r md:border-white/10 lg:border-r-white/10'}
              `}
            >
              <div className="w-20 h-20 bg-gray-800/40 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-2xl">
                <item.icon className={index === 0 ? "text-amber-400" : "text-white"} size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
