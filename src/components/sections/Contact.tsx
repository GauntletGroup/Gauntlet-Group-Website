import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, X } from 'lucide-react';
import { Modal } from '../ui/Modal';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  message: string;
  gdprConsent: boolean;
  website: string;
}

interface ContactProps {
  formData: ContactFormData;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submissionStatus: { type: 'success' | 'error'; message: string } | null;
}

const workflowImages = [
  { src: '/n8n101.png', alt: 'n8n workflow screenshot demonstrating AI alert triage integration' },
  { src: '/n8n102.png', alt: 'n8n workflow screenshot showing IT helpdesk automation' },
  { src: '/n8n103.png', alt: 'n8n workflow screenshot showing employee onboarding and integrations' },
];

export const Contact: React.FC<ContactProps> = ({ formData, errors, touched, handleInputChange, handleBlur, handleSubmit, isSubmitting, submissionStatus }) => {
  const shouldReduceMotion = useReducedMotion();
  const [expandedImage, setExpandedImage] = useState<typeof workflowImages[number] | null>(null);
  const contactInfo = [
    { icon: Mail, title: 'Email', detail: 'imran.ishaq@gauntlet-group.com' },
    { icon: Phone, title: 'Phone', detail: '+44 7800 721443' },
    { icon: MapPin, title: 'Office', detail: 'Peterborough, UK' },
  ];

  const getBorderClass = (fieldName: keyof ContactFormData) => {
    if (touched[fieldName] && errors[fieldName]) return 'border-red-500/70 focus:ring-red-500/30';
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName] !== undefined && formData[fieldName] !== '' && formData[fieldName] !== false) return 'border-emerald-500/50 focus:ring-emerald-500/30';
    return 'border-white/15 focus:ring-amber-500/30 focus:border-amber-500';
  };

  const fieldError = (fieldName: string) => touched[fieldName] && errors[fieldName] ? <p id={`${fieldName}-error`} className="text-red-300 text-xs mt-1 ml-1" role="alert">{errors[fieldName]}</p> : null;

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden border-t border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Start the <span className="bg-gradient-to-r from-amber-400 to-blue-500 bg-clip-text text-transparent">Conversation</span>
          </motion.h2>
          <p className="text-gray-300 max-w-lg mx-auto leading-relaxed">Tell us what you would like to improve and we will be in touch.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-[#0B1120] p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input type="text" name="website" value={formData.website || ''} onChange={handleInputChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">First name *</label>
                  <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} onBlur={handleBlur} required autoComplete="given-name" aria-invalid={Boolean(touched.firstName && errors.firstName)} aria-describedby={touched.firstName && errors.firstName ? 'firstName-error' : undefined} className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${getBorderClass('firstName')}`} />
                  {fieldError('firstName')}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">Last name</label>
                  <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} onBlur={handleBlur} autoComplete="family-name" aria-invalid={Boolean(touched.lastName && errors.lastName)} aria-describedby={touched.lastName && errors.lastName ? 'lastName-error' : undefined} className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${getBorderClass('lastName')}`} />
                  {fieldError('lastName')}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">Work email *</label>
                  <input id="email" type="email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} required autoComplete="email" aria-invalid={Boolean(touched.email && errors.email)} aria-describedby={touched.email && errors.email ? 'email-error' : undefined} className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${getBorderClass('email')}`} />
                  {fieldError('email')}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">Phone</label>
                  <input id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} onBlur={handleBlur} autoComplete="tel" placeholder="+44 7000 000000" className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${getBorderClass('phoneNumber')}`} />
                  {fieldError('phoneNumber')}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">Company</label>
                <input id="company" type="text" name="company" value={formData.company} onChange={handleInputChange} onBlur={handleBlur} autoComplete="organization" className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all placeholder:text-gray-500 ${getBorderClass('company')}`} />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-semibold text-gray-200 uppercase tracking-wider ml-1">What process would you like to improve?</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} onBlur={handleBlur} rows={4} autoComplete="off" placeholder="Tell us a little about the process or task." aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? 'message-error' : undefined} className={`w-full bg-[#151B28] border rounded-2xl px-6 py-4 text-white focus:ring-2 outline-none transition-all resize-none placeholder:text-gray-500 ${getBorderClass('message')}`} />
                {fieldError('message')}
              </div>

              <div className="space-y-2">
                <div className="flex items-start space-x-3 mt-2">
                  <input type="checkbox" name="gdprConsent" id="gdprConsent" checked={formData.gdprConsent} onChange={handleInputChange} onBlur={handleBlur} required aria-invalid={Boolean(touched.gdprConsent && errors.gdprConsent)} aria-describedby={touched.gdprConsent && errors.gdprConsent ? 'gdprConsent-error' : undefined} className="mt-1 h-5 w-5 rounded border-white/10 bg-[#151B28] text-amber-500 focus:ring-amber-500/30 cursor-pointer" />
                  <label htmlFor="gdprConsent" className="text-sm text-gray-300 leading-snug cursor-pointer select-none">I consent to Gauntlet Group storing my information to process this request. *</label>
                </div>
                {fieldError('gdprConsent')}
              </div>

              <motion.button whileHover={shouldReduceMotion ? {} : { scale: 1.01 }} whileTap={shouldReduceMotion ? {} : { scale: 0.99 }} type="submit" disabled={isSubmitting} className="w-full bg-amber-400 text-black font-bold py-5 rounded-full shadow-[0_10px_20px_-5px_rgba(184,134,11,0.3)] hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1120] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send enquiry'}
              </motion.button>

              {submissionStatus && <div role="status" aria-live="polite" className={`rounded-2xl border px-4 py-3 text-sm leading-relaxed ${submissionStatus.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-red-400/30 bg-red-400/10 text-red-200'}`}>{submissionStatus.message}</div>}
            </form>
          </motion.div>

          <div className="space-y-8">
            <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-xl font-bold text-white mb-8">Contact info</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return <div key={info.title} className="flex items-start space-x-5 group"><div className="p-4 rounded-2xl border border-white/15 bg-[#151B28] text-amber-400 transition-transform duration-300 group-hover:scale-105"><Icon size={22} /></div><div><h4 className="text-white font-bold text-base mb-1">{info.title}</h4><p className="text-gray-300 text-sm">{info.detail}</p></div></div>;
                })}
              </div>
            </motion.div>

            <motion.div initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0B1120] p-6 rounded-3xl border border-white/10">
              <h4 className="text-white font-bold text-lg mb-2">Prefer to talk it through?</h4>
              <p className="text-gray-300 text-sm mb-4">30 minutes to discuss your current process and where automation could help.</p>
              <a href="#book-call" className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-2 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">Book a Free Automation Review <ArrowRight size={16} /></a>
            </motion.div>

            <div className="bg-[#0B1120] p-6 rounded-3xl border border-white/10">
              <h4 className="text-white font-bold text-lg mb-2">Workflow examples</h4>
              <p className="text-gray-300 text-sm mb-5">A few examples of the workflow patterns we work with.</p>
              <div className="grid grid-cols-3 gap-3">
                {workflowImages.map((image) => <button key={image.src} type="button" onClick={() => setExpandedImage(image)} className="rounded-lg border border-white/10 bg-white/5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400" aria-label={`Enlarge ${image.alt}`}><img src={image.src} alt={image.alt} width="200" height="176" loading="lazy" decoding="async" className="h-36 w-full object-contain" /></button>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={Boolean(expandedImage)} onClose={() => setExpandedImage(null)}>
        {expandedImage && <div className="p-6 md:p-8"><div className="flex justify-between items-start gap-4 mb-5"><p className="text-white text-sm leading-relaxed">{expandedImage.alt}</p><button type="button" onClick={() => setExpandedImage(null)} aria-label="Close enlarged workflow screenshot" className="text-gray-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"><X size={22} /></button></div><img src={expandedImage.src} alt={expandedImage.alt} className="w-full max-h-[70vh] object-contain rounded-xl bg-black/40" /></div>}
      </Modal>
    </section>
  );
};
