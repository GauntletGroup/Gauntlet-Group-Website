import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle, Leaf, Users, Award, Shield, ArrowUpRight } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" } }
  };

  return (
    <section id="why-choose-us" className="py-24 bg-[#0B1120] relative overflow-hidden border-t border-white/5">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm border border-amber-500/30 rounded-full px-5 py-2 mb-4"
          >
            <Shield className="text-amber-400 mr-2" size={16} />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">Our Guarantees</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 font-display"
          >
            Why Choose <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Gauntlet Group</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Empowering your business through advanced technology and absolute compliance sustainability.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Bento Card 1: WEEE Compliance (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="md:col-span-2 p-8 md:p-10 bg-gray-950/60 backdrop-blur-md border border-white/5 hover:border-amber-400/30 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group cursor-pointer transition-all duration-300"
          >
            <div className="space-y-4 max-w-md">
              <div className="w-14 h-14 bg-amber-400/10 border border-amber-400/20 rounded-2xl flex items-center justify-center">
                <CheckCircle className="text-amber-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">100% WEEE Compliant</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Fully compliant processes ensuring your business meets all environmental regulations and standards in the UK, backed by certified audits.
              </p>
            </div>
            
            {/* Interactive Stats Block inside Bento grid */}
            <div className="bg-gray-900/60 border border-white/5 p-6 rounded-2xl space-y-4 w-full md:w-56 shrink-0 shadow-lg">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Disposal Standard</div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Landfill Diversion</span>
                  <span className="text-amber-400 font-bold">100%</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Data Sanitization</span>
                  <span className="text-blue-400 font-bold">100%</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Sustainable IT Practices (Spans 1 column) */}
          <motion.div 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="p-8 bg-gray-950/60 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors duration-500" />
            <div className="space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center">
                <Leaf className="text-emerald-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Sustainable IT Practices</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Environmentally conscious technology solutions that reduce carbon footprint and promote a circular technology economy.
              </p>
            </div>
            <div className="mt-8 flex items-center text-emerald-400 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform duration-300">
              Circular Loop <ArrowUpRight size={14} />
            </div>
          </motion.div>

          {/* Bento Card 3: Scalable Solutions (Spans 1 column) */}
          <motion.div 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="p-8 bg-gray-950/60 backdrop-blur-md border border-white/5 hover:border-blue-500/30 rounded-[2rem] flex flex-col justify-between group cursor-pointer transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/10 transition-colors duration-500" />
            <div className="space-y-4">
              <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center">
                <Users className="text-blue-400" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white">Scalable Solutions</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Flexible support and infrastructure services that grow alongside your business, from early-stage startups to mature enterprise organisations.
              </p>
            </div>
            <div className="mt-8 flex items-center text-blue-400 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform duration-300">
              Enterprise Ready <ArrowUpRight size={14} />
            </div>
          </motion.div>

          {/* Bento Card 4: Certified Professionals (Spans 2 columns) */}
          <motion.div 
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -5 }}
            className="md:col-span-2 p-8 md:p-10 bg-gray-950/60 backdrop-blur-md border border-white/5 hover:border-indigo-400/30 rounded-[2rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group cursor-pointer transition-all duration-300"
          >
            <div className="space-y-4 max-w-md">
              <div className="w-14 h-14 bg-indigo-400/10 border border-indigo-400/20 rounded-2xl flex items-center justify-center">
                <Award className="text-indigo-400" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white">Certified Professionals</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experienced team of certified experts dedicated to delivering exceptional results, full data safety, and robust, ISO-compliant documentation.
              </p>
            </div>
            
            {/* Custom Badges list */}
            <div className="grid grid-cols-2 gap-3 w-full md:w-64 shrink-0">
              {['ISO 27001', 'ISO 9001', 'ISO 14001', 'WEEE License'].map((cert, index) => (
                <div key={index} className="bg-gray-900/60 border border-white/5 hover:border-indigo-500/20 px-4 py-3 rounded-xl flex items-center justify-center text-center shadow-md transition-all duration-300">
                  <span className="text-xs font-bold text-gray-300 tracking-wide">{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};