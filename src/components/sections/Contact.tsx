import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface ContactProps {
  formData: any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

export const Contact: React.FC<ContactProps> = ({
  formData,
  errors,
  touched,
  handleInputChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const contactInfo = [
    { icon: Mail, title: 'Email', detail: 'imran.ishaq@gauntlet-group.com' },
    { icon: Phone, title: 'Phone', detail: '+44 7800 721443' },
    { icon: MapPin, title: 'Office', detail: 'Peterborough, UK' },
  ];

  const getBorderClass = (fieldName: string) => {
    if (touched[fieldName] && errors[fieldName]) return 'border-red-500/50 focus:ring-red-500/30';
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName] !== undefined && formData[fieldName] !== '' && formData[fieldName] !== false)
      return 'border-emerald-500/50 focus:ring-emerald-500/30';
    return 'border-white/10 focus:ring-amber-500/30 focus:border-amber-500';
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight"
          >
            Start the{' '}
            <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Conversation</span>
          </motion.h2>
          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-gray-500 max-w-lg mx-auto"
          >
            Ready to automate? We'll respond within one working day.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0B1120] p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Names */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('firstName')}`}
                  />
                  {touched.firstName && errors.firstName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('lastName')}`}
                  />
                  {touched.lastName && errors.lastName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('email')}`}
                  />
                  {touched.email && errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="+44 7000 000000"
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('phoneNumber')}`}
                  />
                  {touched.phoneNumber && errors.phoneNumber && <p className="text-red-400 text-xs mt-1 ml-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('company')}`}
                />
              </div>

              {/* Automation Type */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">What to automate?</label>
                <select
                  name="automationType"
                  value={formData.automationType}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all appearance-none cursor-pointer placeholder:text-gray-600 ${getBorderClass('automationType')}`}
                >
                  <option value="" className="bg-[#151B28]">Select an area (optional)</option>
                  <option value="it-alerts" className="bg-[#151B28]">IT alert triage</option>
                  <option value="helpdesk" className="bg-[#151B28]">Helpdesk / password resets</option>
                  <option value="onboarding" className="bg-[#151B28]">Employee onboarding</option>
                  <option value="chatbot" className="bg-[#151B28]">AI assistant</option>
                  <option value="workflows" className="bg-[#151B28]">Data / reporting workflows</option>
                  <option value="integrations" className="bg-[#151B28]">System integrations</option>
                  <option value="weee" className="bg-[#151B28]">WEEE / IT asset disposal</option>
                  <option value="unsure" className="bg-[#151B28]">Not sure — need advice</option>
                </select>
              </div>

              {/* Current Tools */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Current tools</label>
                <input
                  type="text"
                  name="currentTools"
                  value={formData.currentTools}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Microsoft 365, Teams, Azure, Slack, Jira"
                  className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-600 ${getBorderClass('currentTools')}`}
                />
              </div>

              {/* Company Size and Industry */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Company size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all appearance-none cursor-pointer placeholder:text-gray-600 ${getBorderClass('companySize')}`}
                  >
                    <option value="" disabled className="bg-[#151B28]">Select...</option>
                    <option value="Under 10 employees" className="bg-[#151B28]">Under 10</option>
                    <option value="10 - 49 employees" className="bg-[#151B28]">10–49</option>
                    <option value="50 - 249 employees" className="bg-[#151B28]">50–249</option>
                    <option value="250+ employees" className="bg-[#151B28]">250+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all appearance-none cursor-pointer placeholder:text-gray-600 ${getBorderClass('industry')}`}
                  >
                    <option value="" disabled className="bg-[#151B28]">Select...</option>
                    <option value="Technology & IT" className="bg-[#151B28]">Technology & IT</option>
                    <option value="Professional Services" className="bg-[#151B28]">Professional Services</option>
                    <option value="Financial Services" className="bg-[#151B28]">Financial Services</option>
                    <option value="Healthcare & Pharma" className="bg-[#151B28]">Healthcare & Pharma</option>
                    <option value="Manufacturing & Logistics" className="bg-[#151B28]">Manufacturing & Logistics</option>
                    <option value="Education & Non-Profit" className="bg-[#151B28]">Education & Non-Profit</option>
                    <option value="Retail & Hospitality" className="bg-[#151B28]">Retail & Hospitality</option>
                    <option value="Other" className="bg-[#151B28]">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  required
                  rows={4}
                  className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all resize-none placeholder:text-gray-600 ${getBorderClass('message')}`}
                />
                {touched.message && errors.message && <p className="text-red-400 text-xs mt-1 ml-1">{errors.message}</p>}
              </div>

              {/* GDPR */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3 mt-2">
                  <input
                    type="checkbox"
                    name="gdprConsent"
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    className="mt-1 h-5 w-5 rounded border-white/10 bg-[#151B28] text-amber-500 focus:ring-amber-500/30 cursor-pointer"
                  />
                  <label htmlFor="gdprConsent" className="text-xs text-gray-400 leading-snug cursor-pointer select-none">
                    I consent to Gauntlet Group storing my information to process this request. *
                  </label>
                </div>
                {touched.gdprConsent && errors.gdprConsent && <p className="text-red-400 text-xs mt-1 ml-1">{errors.gdprConsent}</p>}
              </div>

              <motion.button
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-blue-600 text-white font-bold py-5 rounded-full shadow-[0_10px_20px_-5px_rgba(184,134,11,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(184,134,11,0.4)] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </motion.button>
            </form>
          </motion.div>

          {/* Info */}
          <div className="space-y-8">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-white mb-8">Contact Info</h3>
              <div className="space-y-6">
                {contactInfo.map((info, i) => {
                  const colors = {
                    Email: 'text-amber-400 border-amber-400/30 bg-amber-400/5',
                    Phone: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
                    Office: 'text-white border-white/20 bg-white/5',
                  };
                  const colorClass = colors[info.title as keyof typeof colors] || 'text-amber-400 border-white/5 bg-[#151B28]';
                  return (
                    <div key={i} className="flex items-start space-x-5 group">
                      <div className={`p-4 rounded-2xl border transition-all duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'} ${colorClass}`}>
                        <info.icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base mb-1">{info.title}</h4>
                        <p className="text-gray-400 text-sm">{info.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0B1120] p-6 rounded-3xl border border-white/5"
            >
              <h4 className="text-white font-bold text-lg mb-2">Ready to start?</h4>
              <p className="text-gray-500 text-sm mb-4">Book a free 20-minute automation review.</p>
              <a href="#book-call" className={`text-amber-400 font-bold inline-flex items-center ${shouldReduceMotion ? '' : 'hover:translate-x-2'} transition-transform text-sm`}>
                Book a consultation <ArrowRight className="ml-2" size={16} />
              </a>
            </motion.div>

            {/* Compliance Logo */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center lg:items-start space-y-3"
            >
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Certified Compliance</span>
              <img
                src="/ISO27701COMBINED.jpg"
                alt="ISO Accelerator Certified"
                className="h-20 w-auto rounded-xl grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
