import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';
import type { ContactInquiry } from './lib/supabase';
import { Recycle, Shield, Monitor, Zap } from 'lucide-react';

// Layout & UI
import { Navbar } from './components/layout/Navbar';
import { Cursor } from './components/ui/Cursor';
import { Modal } from './components/ui/Modal';

// Sections
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { WhyUs } from './components/sections/WhyUs';
import { Process } from './components/sections/Process';
import { BookCall } from './components/sections/BookCall';
import { Contact } from './components/sections/Contact';
import { ImpactWidget } from './components/ui/ImpactWidget';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWEEEModalOpen, setIsWEEEModalOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    companySize: '',
    industry: '',
    message: '',
    gdprConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [weeeTab, setWeeeTab] = useState<'overview' | 'process' | 'security'>('overview');
  const [techTab, setTechTab] = useState<'overview' | 'web' | 'ai'>('overview');

  const validateField = (name: string, value: any) => {
    let error = '';
    if (name === 'firstName') {
      if (typeof value === 'string' && !value.trim()) {
        error = 'First name is required';
      }
    } else if (name === 'lastName') {
      if (typeof value === 'string' && !value.trim()) {
        error = 'Last name is required';
      }
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === 'string') {
        if (!value.trim()) {
          error = 'Email address is required';
        } else if (!emailRegex.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
      }
    } else if (name === 'message') {
      if (typeof value === 'string') {
        if (!value.trim()) {
          error = 'Message is required';
        } else if (value.trim().length < 10) {
          error = 'Message must be at least 10 characters';
        }
      }
    } else if (name === 'gdprConsent') {
      if (!value) {
        error = 'You must accept the GDPR compliance statement';
      }
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({
      ...prev,
      [name]: val
    }));

    if (touched[name]) {
      const fieldError = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, val);
    setErrors(prev => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formFields = ['firstName', 'lastName', 'email', 'message', 'gdprConsent'];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let hasErrors = false;

    formFields.forEach(field => {
      newTouched[field] = true;
      const fieldVal = formData[field as keyof typeof formData];
      const fieldErr = validateField(field, fieldVal);
      if (fieldErr) {
        newErrors[field] = fieldErr;
        hasErrors = true;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (hasErrors) return;

    setIsSubmitting(true);
    let supabaseSuccess = false;
    let n8nSuccess = false;

    // 1. Send to Supabase
    try {
      const inquiryData: ContactInquiry = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact_number: null,
        company: formData.company || null,
        message: `${formData.message}\n\n---\nCompany Size: ${formData.companySize || 'Not specified'}\nIndustry: ${formData.industry || 'Not specified'}\nGDPR Consent: Yes`
      };

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([inquiryData]);

      if (error) throw error;
      supabaseSuccess = true;
    } catch (supabaseError) {
      console.error('Supabase submission failed:', supabaseError);
    }

    // 2. Send to n8n Webhook
    const n8nWebhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || import.meta.env.VITE_N8N_WEBOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            company: formData.company || null,
            companySize: formData.companySize || null,
            industry: formData.industry || null,
            message: formData.message,
            gdprConsent: formData.gdprConsent,
            submittedAt: new Date().toISOString()
          }),
        });
        n8nSuccess = true;
      } catch (webhookError) {
        console.error('Failed to send data to n8n webhook:', webhookError);
      }
    } else {
      console.warn('n8n Webhook URL is not configured.');
    }

    // 3. UI Feedback
    if (supabaseSuccess || n8nSuccess) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        companySize: '',
        industry: '',
        message: '',
        gdprConsent: false
      });
      setTouched({});
      setErrors({});
      alert('Thank you for your inquiry! We\'ll get back to you soon.');
    } else {
      alert('There was an error submitting your inquiry. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleServiceClick = (title: string) => {
    if (title === 'Tech Consulting') {
      setTechTab('overview');
      setIsTechModalOpen(true);
    } else if (title === 'WEEE Waste Management') {
      setWeeeTab('overview');
      setIsWEEEModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      <Cursor />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <Hero />
        <ImpactWidget />
        <About />
        <Services onServiceClick={handleServiceClick} />
        <Process />
        <WhyUs />
        <BookCall />
        <Contact
          formData={formData}
          errors={errors}
          touched={touched}
          handleInputChange={handleInputChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Gauntlet Group. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <Modal isOpen={isWEEEModalOpen} onClose={() => setIsWEEEModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <Recycle className="text-emerald-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">WEEE Waste Management</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'process', 'security'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setWeeeTab(tab)}
                className={`relative px-5 py-3 text-sm font-semibold capitalize transition-colors duration-300
                  ${weeeTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'}
                `}
              >
                {tab}
                {weeeTab === tab && (
                  <motion.div
                    layoutId="weeeActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {weeeTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  Empowering the circular tech loop with zero-cost logistics and certified processing.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Zero Cost Disposal', icon: '💰', desc: 'No-charge collection & logistics for qualifying tech assets.' },
                    { title: 'Asset Recovery', icon: '🔄', desc: 'Reclaim value from retired equipment with smart components.' },
                    { title: 'IT Refurbishment', icon: '🔧', desc: 'Extend hardware lifecycles and reduce carbon emissions.' },
                    { title: 'Nationwide Collection', icon: '🚛', desc: 'Fully tracked collection from any UK site.' }
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5 flex items-start space-x-4">
                      <span className="text-3xl shrink-0">{s.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{s.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {weeeTab === 'process' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  A structured, fully transparent lifecycle workflow from collection to materials recovery.
                </p>
                <div className="space-y-3">
                  {[
                    { step: '1. Secure Logistics', desc: 'Assets are collected in secure containers and transport manifests logged.' },
                    { step: '2. Audited Processing', desc: 'All items are registered, weighed, and serialized into our database.' },
                    { step: '3. Materials Sorting', desc: 'Metals, plastics, and reusable modules are sorted with zero-to-landfill policy.' }
                  ].map((p, i) => (
                    <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                      <div className="font-bold text-amber-400 text-sm mb-1">{p.step}</div>
                      <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {weeeTab === 'security' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  Absolute security guarantees protecting your corporate data and corporate IP.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Data Sanitization', icon: '🔒', desc: 'Military-grade data erasure conforming to NIST 800-88 guidelines.' },
                    { title: 'Hard Drive Shredding', icon: '🗂️', desc: 'Physical crushing/shredding of disks to complete destruction.' },
                    { title: 'Destruction Certificates', icon: '📝', desc: 'Serialized certificate lists provided for full regulatory auditing.' },
                    { title: 'Asset De-branding', icon: '🏷️', desc: 'Removal of asset tags, company logos, and identity indicators.' }
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5 flex items-start space-x-4">
                      <span className="text-3xl shrink-0">{s.icon}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{s.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Monitor className="text-amber-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Tech Consulting Services</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-xs mx-auto">
            {(['overview', 'web', 'ai'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTechTab(tab)}
                className={`relative px-5 py-3 text-sm font-semibold capitalize transition-colors duration-300
                  ${techTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'}
                `}
              >
                {tab}
                {techTab === tab && (
                  <motion.div
                    layoutId="techActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[250px]">
            {techTab === 'overview' && (
              <div className="space-y-4 text-center">
                <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto mb-6">
                  High-performance consulting to design, scale, and automate your technological capabilities.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/5 text-left">
                    <div className="text-2xl mb-2">🌐</div>
                    <h4 className="font-bold text-white mb-1 text-sm">Full-Stack Development</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Enterprise software architecture & modern web deployment.</p>
                  </div>
                  <div className="bg-gray-800/30 p-6 rounded-2xl border border-white/5 text-left">
                    <div className="text-2xl mb-2">🤖</div>
                    <h4 className="font-bold text-white mb-1 text-sm">AI Agent Deployments</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">Automating workflows and user support using advanced LLMs.</p>
                  </div>
                </div>
              </div>
            )}

            {techTab === 'web' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  We specialize in building next-gen web platforms powered by sub-second loading states and highly responsive layouts.
                </p>
                <div className="space-y-3">
                  {[
                    { feature: 'Modern Framework Stack', desc: 'Vite, React, TypeScript, Tailwind, Framer Motion, and Next.js.' },
                    { feature: 'Database & Backend', desc: 'Supabase real-time databases, secure authorization, and serverless logic.' },
                    { feature: 'SEO & Performance Scaling', desc: 'Server-side pre-rendering, lazy loading, and semantic compliance audits.' }
                  ].map((f, i) => (
                    <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                      <div className="font-bold text-amber-400 text-xs mb-1">{f.feature}</div>
                      <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {techTab === 'ai' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  Bring interactive automation into your workflows with intelligent chatbots and integrated API tooling.
                </p>
                <div className="space-y-3">
                  {[
                    { feature: 'Custom Knowledge Bases', desc: 'Embed your documentation libraries directly into conversational search utilities.' },
                    { feature: 'Interactive API Integrations', desc: 'Automate tasks like calendar bookings, support ticket routing, or lead captures.' },
                    { feature: 'Multi-platform support', desc: 'Omnichannel availability across Slack, Discord, web portals, and WhatsApp.' }
                  ].map((f, i) => (
                    <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                      <div className="font-bold text-blue-400 text-xs mb-1">{f.feature}</div>
                      <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
