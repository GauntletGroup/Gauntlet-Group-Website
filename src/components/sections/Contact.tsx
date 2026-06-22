import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface ContactProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const Contact: React.FC<ContactProps> = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  isSubmitting 
}) => {
  const contactInfo = [
    { icon: Mail, title: 'Email', detail: 'imran.ishaq@gauntlet-group.com', color: 'amber' },
    { icon: Phone, title: 'Phone', detail: '+44 7800 721443', color: 'emerald' },
    { icon: MapPin, title: 'Office', detail: 'Peterborough, United Kingdom', color: 'blue' }
  ];

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          >
            Get in <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Touch</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B1120] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#151B28] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#151B28] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-[#151B28] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    className="w-full bg-[#151B28] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-[#151B28] border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all resize-none placeholder:text-gray-600"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-blue-600 text-white font-bold py-5 rounded-full shadow-[0_10px_20px_-5px_rgba(184,134,11,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(184,134,11,0.4)] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-10">Contact Information</h3>
              <div className="space-y-8">
                {contactInfo.map((info, i) => {
                  const colors = {
                    Email: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
                    Phone: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
                    Office: 'text-white border-white/20 bg-white/5'
                  };
                  const colorClass = colors[info.title as keyof typeof colors] || 'text-amber-400 border-white/5 bg-[#151B28]';
                  
                  return (
                    <div key={i} className="flex items-start space-x-6 group">
                      <div className={`p-4 rounded-2xl border transition-all duration-300 group-hover:scale-110 ${colorClass}`}>
                        <info.icon size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg mb-1">{info.title}</h4>
                        <p className="text-gray-400">{info.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0B1120] p-8 rounded-3xl border border-white/5"
            >
              <h4 className="text-white font-bold text-xl mb-3">Ready to Get Started?</h4>
              <p className="text-gray-400 mb-6 leading-relaxed">Schedule a free consultation to discuss your technology and sustainability goals.</p>
              <a href="#contact" className="text-amber-400 font-bold inline-flex items-center hover:translate-x-2 transition-transform">
                Book a consultation <ArrowRight className="ml-2" size={18} />
              </a>
            </motion.div>

            {/* Compliance Logo */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start space-y-4"
            >
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Certified Compliance</span>
              <img 
                src="/ISO27701COMBINED.jpg" 
                alt="ISO Accelerator Certified" 
                className="h-24 w-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
