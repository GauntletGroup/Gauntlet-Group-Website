import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';
import type { ContactInquiry } from './lib/supabase';
import { Recycle, Activity } from 'lucide-react';

// Layout & UI
import { Navbar } from './components/layout/Navbar';
import { Cursor } from './components/ui/Cursor';
import { Modal } from './components/ui/Modal';

// Sections
import { Hero } from './components/sections/Hero';
import { Problems } from './components/sections/Problems';
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
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    companySize: '',
    industry: '',
    automationType: '',
    currentTools: '',
    message: '',
    gdprConsent: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [weeeTab, setWeeeTab] = useState<'overview' | 'process' | 'security'>('overview');
  const [alertTab, setAlertTab] = useState<'overview' | 'integrations' | 'how-it-works'>('overview');

  const validateField = (name: string, value: any) => {
    let error = '';
    if (name === 'firstName') {
      if (typeof value === 'string' && !value.trim()) error = 'First name is required';
    } else if (name === 'lastName') {
      if (typeof value === 'string' && !value.trim()) error = 'Last name is required';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (typeof value === 'string') {
        if (!value.trim()) error = 'Email address is required';
        else if (!emailRegex.test(value.trim())) error = 'Please enter a valid email address';
      }
    } else if (name === 'message') {
      if (typeof value === 'string') {
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
      }
    } else if (name === 'gdprConsent') {
      if (!value) error = 'You must accept the GDPR compliance statement';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, val) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, val) }));
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
      if (fieldErr) { newErrors[field] = fieldErr; hasErrors = true; }
    });

    setTouched(newTouched);
    setErrors(newErrors);
    if (hasErrors) return;

    setIsSubmitting(true);
    let supabaseSuccess = false;
    let n8nSuccess = false;

    // 1. Send to Supabase
    try {
      const messageParts = [
        formData.message,
        '---',
        `Company Size: ${formData.companySize || 'Not specified'}`,
        `Industry: ${formData.industry || 'Not specified'}`,
        `Automation Type: ${formData.automationType || 'Not specified'}`,
        `Current Tools: ${formData.currentTools || 'Not specified'}`,
        'GDPR Consent: Yes'
      ];
      const inquiryData: ContactInquiry = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact_number: formData.phoneNumber || null,
        company: formData.company || null,
        message: messageParts.join('\n')
      };
      const { error } = await supabase.from('contact_inquiries').insert([inquiryData]);
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
            phoneNumber: formData.phoneNumber || null,
            company: formData.company || null,
            companySize: formData.companySize || null,
            industry: formData.industry || null,
            automationType: formData.automationType || null,
            currentTools: formData.currentTools || null,
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
        phoneNumber: '',
        company: '',
        companySize: '',
        industry: '',
        automationType: '',
        currentTools: '',
        message: '',
        gdprConsent: false
      });
      setTouched({});
      setErrors({});
      alert("Thank you for your inquiry! We'll get back to you soon.");
    } else {
      alert('There was an error submitting your inquiry. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleServiceClick = (title: string) => {
    if (title === 'AI Alert Triage & Incident Escalation') {
      setAlertTab('overview');
      setIsAlertModalOpen(true);
    } else if (title === 'WEEE & IT Asset Lifecycle Services') {
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
        <Problems />
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
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-gray-500 text-sm">AI &amp; IT Automation for Growing Businesses</p>
          <div className="flex justify-center gap-6 text-xs">
            <a href="#services" className="text-gray-600 hover:text-amber-400 transition-colors duration-200">Automation Services</a>
            <a href="#contact" className="text-gray-600 hover:text-amber-400 transition-colors duration-200">Book a Review</a>
            <a href="#services" className="text-gray-600 hover:text-emerald-400 transition-colors duration-200">WEEE Services</a>
          </div>
          <p className="text-gray-700 text-xs">&copy; {new Date().getFullYear()} Gauntlet Group. All rights reserved.</p>
        </div>
      </footer>

      {/* AI Alert Triage Modal */}
      <Modal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Activity className="text-amber-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Alert Triage &amp; Incident Escalation</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'integrations', 'how-it-works'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAlertTab(tab)}
                className={`relative px-4 py-3 text-sm font-semibold capitalize transition-colors duration-300 whitespace-nowrap
                  ${alertTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'}
                `}
              >
                {tab === 'how-it-works' ? 'How It Works' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {alertTab === tab && (
                  <motion.div
                    layoutId="alertActiveTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {alertTab === 'overview' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  Our flagship automation ingests monitoring alerts from Azure and other sources, uses AI to generate a plain-English incident summary, classifies urgency, routes notifications, and maintains an audit log — all without manual intervention.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'AI Incident Summary', desc: 'Technical alerts converted to clear, actionable language your whole team can understand.' },
                    { title: 'Severity Classification', desc: 'Critical, Medium, and Low urgency assigned automatically based on configurable rules.' },
                    { title: 'Smart Routing', desc: 'Critical alerts go to Teams and email immediately. Lower-severity events are logged or batched.' },
                    { title: 'Audit Logging', desc: 'Every alert, classification, and notification recorded for reporting and compliance.' }
                  ].map((s, i) => (
                    <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                      <h4 className="font-bold text-amber-400 text-sm mb-1">{s.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {alertTab === 'integrations' && (
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed text-center mb-6">
                  Works with the monitoring and communication tools your team already uses.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'Azure Monitor', 'Microsoft Teams', 'Outlook / Email', 'Slack',
                    'Jira Service Management', 'Google Gemini AI', 'PagerDuty / Opsgenie', 'ServiceNow'
                  ].map((tool, i) => (
                    <div key={i} className="bg-gray-800/30 border border-white/5 rounded-xl px-4 py-3 text-center">
                      <span className="text-xs font-semibold text-gray-300">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {alertTab === 'how-it-works' && (
              <div className="space-y-4 max-w-xl mx-auto">
                <div className="space-y-3">
                  {[
                    { step: '1. Alert Received', desc: 'Your monitoring platform sends an alert to the automation workflow via webhook or API.' },
                    { step: '2. AI Triage', desc: 'Google Gemini summarises the alert in plain English and assigns a severity level based on your rules.' },
                    { step: '3. Notify & Log', desc: 'Critical alerts are sent immediately to the right channel. All events are logged to your chosen audit store.' }
                  ].map((p, i) => (
                    <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                      <div className="font-bold text-amber-400 text-sm mb-1">{p.step}</div>
                      <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 bg-amber-400/5 border border-amber-400/20 rounded-xl px-5 py-4">
            <p className="text-amber-300 text-xs leading-relaxed text-center">
              <strong>Demonstration implementation:</strong> Azure Monitor → AI Summary &amp; Severity Classification → Microsoft Teams / Outlook → Audit Log. Contact us to discuss implementation for your environment.
            </p>
          </div>
        </div>
      </Modal>

      {/* WEEE Modal */}
      <Modal isOpen={isWEEEModalOpen} onClose={() => setIsWEEEModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-emerald-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <Recycle className="text-emerald-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">WEEE &amp; IT Asset Lifecycle Services</h2>
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
    </div>
  );
}

export default App;
