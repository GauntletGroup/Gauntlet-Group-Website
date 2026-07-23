import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './lib/supabase';
import type { ContactInquiry } from './lib/supabase';
import { Recycle, Activity, Headphones, Users, MessageSquare, GitBranch, Mail, Linkedin, ArrowUp } from 'lucide-react';

// Layout & UI
import { Navbar } from './components/layout/Navbar';
import { Cursor } from './components/ui/Cursor';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { IntroOverlay } from './components/ui/IntroOverlay';
import { TechStackStrip } from './components/ui/TechStackStrip';

// Sections
import { Hero } from './components/sections/Hero';
import { ImpactWidget } from './components/ui/ImpactWidget';
import { Problems } from './components/sections/Problems';
import { Services } from './components/sections/Services';
import { WorkflowDiagram } from './components/sections/WorkflowDiagram';
import { About } from './components/sections/About';
import { Process } from './components/sections/Process';
import { WhyUs } from './components/sections/WhyUs';
import { FAQ } from './components/sections/FAQ';
import { BookCall } from './components/sections/BookCall';
import { Contact } from './components/sections/Contact';
import { FounderQuote } from './components/sections/FounderQuote';
import { StickyBookCTA } from './components/ui/StickyBookCTA';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);
  const [isWEEEModalOpen, setIsWEEEModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isHelpdeskModalOpen, setIsHelpdeskModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isCustomWorkflowModalOpen, setIsCustomWorkflowModalOpen] = useState(false);
  const [isAIAssistantModalOpen, setIsAIAssistantModalOpen] = useState(false);
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
    gdprConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [weeeTab, setWeeeTab] = useState<'overview' | 'process' | 'security'>('overview');
  const [alertTab, setAlertTab] = useState<'overview' | 'demo' | 'integrations' | 'how-it-works'>('overview');
  const [helpdeskTab, setHelpdeskTab] = useState<'overview' | 'demo' | 'how-it-works'>('overview');
  const [onboardingTab, setOnboardingTab] = useState<'overview' | 'demo' | 'how-it-works'>('overview');

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
    setFormData((prev) => ({ ...prev, [name]: val }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, val) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formFields = ['firstName', 'lastName', 'email', 'message', 'gdprConsent'];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    let hasErrors = false;

    formFields.forEach((field) => {
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

    try {
      const messageParts = [
        formData.message,
        '---',
        `Company Size: ${formData.companySize || 'Not specified'}`,
        `Industry: ${formData.industry || 'Not specified'}`,
        `Automation Type: ${formData.automationType || 'Not specified'}`,
        `Current Tools: ${formData.currentTools || 'Not specified'}`,
        'GDPR Consent: Yes',
      ];
      const inquiryData: ContactInquiry = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact_number: formData.phoneNumber || null,
        company: formData.company || null,
        message: messageParts.join('\n'),
      };
      const { error } = await supabase.from('contact_inquiries').insert([inquiryData]);
      if (error) throw error;
      supabaseSuccess = true;
    } catch (supabaseError) {
      console.error('Supabase submission failed:', supabaseError);
    }

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
            submittedAt: new Date().toISOString(),
          }),
        });
        n8nSuccess = true;
      } catch (webhookError) {
        console.error('Failed to send data to n8n webhook:', webhookError);
      }
    } else {
      console.warn('n8n Webhook URL is not configured.');
    }

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
        gdprConsent: false,
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
    if (title === 'AI Alert Triage') {
      setAlertTab('overview');
      setIsAlertModalOpen(true);
    } else if (title === 'WEEE & IT Asset Disposal') {
      setWeeeTab('overview');
      setIsWEEEModalOpen(true);
    } else if (title === 'IT Helpdesk Automation') {
      setHelpdeskTab('overview');
      setIsHelpdeskModalOpen(true);
    } else if (title === 'Employee Onboarding') {
      setOnboardingTab('overview');
      setIsOnboardingModalOpen(true);
    } else if (title === 'Custom Workflows') {
      setIsCustomWorkflowModalOpen(true);
    } else if (title === 'AI Support Assistants') {
      setIsAIAssistantModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      <IntroOverlay onComplete={handleIntroComplete} />
      <Cursor />
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <Hero />
        <ImpactWidget />
        <TechStackStrip />
        <Problems />
        <Services onServiceClick={handleServiceClick} />
        <WorkflowDiagram />
        <About />
        <Process />
        <WhyUs />
        <FounderQuote />
        <FAQ />
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
      <footer className="relative bg-black border-t border-white/5 overflow-hidden">
        {/* Large tagline */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img
                src="/Gauntlet Brand Transparent Background copy.png"
                alt="Gauntlet Group"
                className="w-12 h-12 object-contain"
              />
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-extrabold text-gray-800 tracking-tight leading-none mb-4">
              Always automating.
            </h2>
            <a
              href="mailto:imran.ishaq@gauntlet-group.com"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-lg font-semibold transition-colors"
            >
              <Mail size={18} />
              imran.ishaq@gauntlet-group.com
            </a>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
            <div className="flex gap-6 text-xs">
              <a href="#services" className="text-gray-600 hover:text-amber-400 transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-amber-400 transition-colors">About</a>
              <a href="#contact" className="text-gray-600 hover:text-amber-400 transition-colors">Book a Review</a>
              <a href="#faq" className="text-gray-600 hover:text-amber-400 transition-colors">FAQ</a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/gauntlet-group"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-amber-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-gray-600 hover:text-amber-400 transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp size={18} />
              </button>
            </div>
          </div>
          <p className="text-gray-700 text-[10px] text-center mt-6">&copy; {new Date().getFullYear()} Gauntlet Group. All rights reserved.</p>
        </div>
      </footer>

      <StickyBookCTA />

      {/* AI Alert Triage Modal */}
      <Modal isOpen={isAlertModalOpen} onClose={() => setIsAlertModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Activity className="text-amber-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Alert Triage</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'demo', 'integrations', 'how-it-works'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setAlertTab(tab)}
                className={`relative px-4 py-3 text-sm font-semibold capitalize transition-colors duration-300 whitespace-nowrap ${
                  alertTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'how-it-works' ? 'How It Works' : tab === 'demo' ? 'Watch Demo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {alertTab === tab && <motion.div layoutId="alertActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {alertTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'AI Incident Summary', desc: 'Technical alerts translated into plain English your whole team can act on.' },
                  { title: 'Severity Classification', desc: 'Critical, Medium, and Low urgency auto-assigned by configurable rules.' },
                  { title: 'Smart Routing', desc: 'Critical alerts hit Teams and email instantly. Lower-severity events are logged or batched.' },
                  { title: 'Audit Logging', desc: 'Every alert, classification, and notification recorded for compliance.' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-amber-400 text-sm mb-2">{s.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {alertTab === 'demo' && (
              <div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src="https://www.youtube.com/embed/ALERT_VIDEO_ID"
                    allowFullScreen
                    frameBorder="0"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="AI Alert Triage Demo"
                  />
                </div>
                <p className="text-gray-500 text-xs text-center mt-3">Azure Monitor → AI Summary → Teams → Audit Log</p>
              </div>
            )}

            {alertTab === 'integrations' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Azure Monitor', 'Microsoft Teams', 'Outlook', 'Slack', 'Jira Service Mgmt', 'Google Gemini', 'PagerDuty', 'ServiceNow'].map((tool, i) => (
                  <div key={i} className="bg-gray-800/30 border border-white/5 rounded-xl px-4 py-3 text-center">
                    <span className="text-xs font-semibold text-gray-300">{tool}</span>
                  </div>
                ))}
              </div>
            )}

            {alertTab === 'how-it-works' && (
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { step: 'Alert received', desc: 'Monitoring sends alert via webhook.' },
                  { step: 'AI triages', desc: 'Gemini summarises and classifies severity.' },
                  { step: 'Notify & log', desc: 'Critical → Teams/email. All logged.' },
                ].map((p, i) => (
                  <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                    <div className="font-bold text-amber-400 text-sm mb-1">{p.step}</div>
                    <p className="text-gray-400 text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-amber-400/5 border border-amber-400/20 rounded-xl px-5 py-4">
            <p className="text-amber-300 text-xs text-center">
              <strong>Demo:</strong> Azure Monitor → AI → Teams → Audit Log. Contact us to discuss your setup.
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">WEEE &amp; IT Asset Disposal</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'process', 'security'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setWeeeTab(tab)}
                className={`relative px-5 py-3 text-sm font-semibold capitalize transition-colors duration-300 ${
                  weeeTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
                {weeeTab === tab && <motion.div layoutId="weeeActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {weeeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { emoji: '💰', title: 'Zero Cost Disposal', desc: 'No-charge collection & logistics for qualifying tech assets.' },
                  { emoji: '🔄', title: 'Asset Recovery', desc: 'Reclaim value from retired equipment with smart components.' },
                  { emoji: '🔧', title: 'IT Refurbishment', desc: 'Extend hardware lifecycles and reduce carbon emissions.' },
                  { emoji: '🚛', title: 'Nationwide Collection', desc: 'Fully tracked collection from any UK site.' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{s.emoji}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                      <p className="text-gray-400 text-xs">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {weeeTab === 'process' && (
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { emoji: '📦', step: 'Secure Logistics', desc: 'Assets collected in secure, tracked containers.' },
                  { emoji: '📋', step: 'Audited Processing', desc: 'Items registered, weighed, and serialized on arrival.' },
                  { emoji: '♻️', step: 'Materials Sorting', desc: 'Zero-to-landfill policy across all processed equipment.' },
                ].map((p, i) => (
                  <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5 flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                    <div>
                      <div className="font-bold text-amber-400 text-sm mb-1">{p.step}</div>
                      <p className="text-gray-400 text-xs">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {weeeTab === 'security' && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { emoji: '🔒', title: 'Data Sanitization', desc: 'Military-grade data erasure conforming to NIST 800-88 guidelines.' },
                  { emoji: '📂', title: 'Hard Drive Shredding', desc: 'Physical crushing/shredding of disks to complete destruction.' },
                  { emoji: '📋', title: 'Destruction Certificates', desc: 'Serialized certificate lists provided for full regulatory auditing.' },
                  { emoji: '🏷️', title: 'Asset De-branding', desc: 'Removal of asset tags, company logos, and identity indicators.' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5 flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{s.emoji}</span>
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{s.title}</h4>
                      <p className="text-gray-400 text-xs">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* IT Helpdesk Automation Modal */}
      <Modal isOpen={isHelpdeskModalOpen} onClose={() => setIsHelpdeskModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-amber-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
              <Headphones className="text-amber-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">IT Helpdesk Automation</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'demo', 'how-it-works'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setHelpdeskTab(tab)}
                className={`relative px-4 py-3 text-sm font-semibold capitalize transition-colors duration-300 whitespace-nowrap ${
                  helpdeskTab === tab ? 'text-amber-400 font-bold' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'how-it-works' ? 'How It Works' : tab === 'demo' ? 'Watch Demo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {helpdeskTab === tab && <motion.div layoutId="helpdeskActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {helpdeskTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Password resets', desc: 'Self-service form → Azure reset → email. Zero IT involvement.' },
                  { title: 'Ticket classification', desc: 'Auto-categorised by type and urgency.' },
                  { title: 'Access requests', desc: 'Form → validation → approver notification.' },
                  { title: 'AI knowledge base', desc: 'Common questions answered before a ticket is raised.' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-amber-400 text-sm mb-1">{s.title}</h4>
                    <p className="text-gray-400 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {helpdeskTab === 'demo' && (
              <div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src="https://www.youtube.com/embed/HELPDESK_VIDEO_ID"
                    allowFullScreen
                    frameBorder="0"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="IT Helpdesk Automation Demo"
                  />
                </div>
                <p className="text-gray-500 text-xs text-center mt-3">Tally → Azure AD → Graph API → Email → Audit Log</p>
              </div>
            )}

            {helpdeskTab === 'how-it-works' && (
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { step: 'Request submitted', desc: 'Staff fills a self-service form.' },
                  { step: 'Workflow executes', desc: 'n8n authenticates, performs action.' },
                  { step: 'User notified & logged', desc: 'Instant email. Full audit trail.' },
                ].map((p, i) => (
                  <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                    <div className="font-bold text-amber-400 text-sm mb-1">{p.step}</div>
                    <p className="text-gray-400 text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-amber-400/5 border border-amber-400/20 rounded-xl px-5 py-4">
            <p className="text-amber-300 text-xs text-center">
              <strong>Demo:</strong> Tally → n8n → Azure AD → Graph API → Outlook → Sheets. Contact us to discuss your setup.
            </p>
          </div>
        </div>
      </Modal>

      {/* Employee Onboarding Modal */}
      <Modal isOpen={isOnboardingModalOpen} onClose={() => setIsOnboardingModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <Users className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Employee Onboarding</h2>
          </div>

          <div className="flex justify-center border-b border-gray-800 mb-8 max-w-md mx-auto">
            {(['overview', 'demo', 'how-it-works'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setOnboardingTab(tab)}
                className={`relative px-4 py-3 text-sm font-semibold capitalize transition-colors duration-300 whitespace-nowrap ${
                  onboardingTab === tab ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab === 'how-it-works' ? 'How It Works' : tab === 'demo' ? 'Watch Demo' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                {onboardingTab === tab && <motion.div layoutId="onboardingActiveTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
              </button>
            ))}
          </div>

          <div className="min-h-[280px]">
            {onboardingTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Azure AD account', desc: 'Created automatically from form data.' },
                  { title: 'Welcome email', desc: 'Credentials + first-day info sent instantly.' },
                  { title: 'IT notification', desc: 'Onboarding checklist sent to IT team.' },
                  { title: 'Duplicate detection', desc: 'Catches failures and alerts IT immediately.' },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                    <h4 className="font-bold text-blue-400 text-sm mb-1">{s.title}</h4>
                    <p className="text-gray-400 text-xs">{s.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {onboardingTab === 'demo' && (
              <div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src="https://www.youtube.com/embed/ONBOARDING_VIDEO_ID"
                    allowFullScreen
                    frameBorder="0"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    title="Employee Onboarding Demo"
                  />
                </div>
                <p className="text-gray-500 text-xs text-center mt-3">Tally → Azure AD → Welcome email → IT notification → Audit Log</p>
              </div>
            )}

            {onboardingTab === 'how-it-works' && (
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { step: 'Manager submits form', desc: 'Name, email, department, start date.' },
                  { step: 'Account created', desc: 'Azure AD via Graph API in seconds.' },
                  { step: 'Notifications sent', desc: 'Welcome email + IT checklist + audit log.' },
                ].map((p, i) => (
                  <div key={i} className="bg-gray-800/20 p-4 rounded-xl border border-white/5">
                    <div className="font-bold text-blue-400 text-sm mb-1">{p.step}</div>
                    <p className="text-gray-400 text-xs">{p.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 bg-blue-400/5 border border-blue-400/20 rounded-xl px-5 py-4">
            <p className="text-blue-300 text-xs text-center">
              <strong>Demo:</strong> Tally → n8n → Azure AD → Graph API → Outlook → Sheets.
            </p>
          </div>
        </div>
      </Modal>

      {/* Custom Workflow Modal */}
      <Modal isOpen={isCustomWorkflowModalOpen} onClose={() => setIsCustomWorkflowModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <GitBranch className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Custom Workflows</h2>
            <p className="text-gray-400 text-sm text-center mb-8">If it involves copying data or waiting for a human — we automate it.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { title: 'CRM & Sales', desc: 'Lead capture → CRM → follow-up. No manual entry.' },
              { title: 'Finance', desc: 'Scheduled reports, auto-distributed.' },
              { title: 'HR & People', desc: 'Absence requests, approvals, system updates.' },
              { title: 'IT Operations', desc: 'Patch notifications, asset tracking, licence audits.' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-blue-400 text-sm mb-1">{s.title}</h4>
                <p className="text-gray-400 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {['Trigger', 'n8n', 'Your Apps', 'Notify', 'Log'].map((step, i, arr) => (
              <React.Fragment key={i}>
                <span className="bg-gray-800/50 border border-white/10 text-gray-400 text-xs px-3 py-1.5 rounded-full">{step}</span>
                {i < arr.length - 1 && <span className="text-amber-400">→</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-6 bg-amber-400/5 border border-amber-400/20 rounded-xl px-5 py-4">
            <p className="text-amber-300 text-xs text-center">
              Free 30-minute scoping call. Fixed-price quote before any work begins.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Button variant="primary" onClick={() => { setIsCustomWorkflowModalOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Book a Free Scoping Call
            </Button>
          </div>
        </div>
      </Modal>

      {/* AI Support Assistants Modal */}
      <Modal isOpen={isAIAssistantModalOpen} onClose={() => setIsAIAssistantModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
              <MessageSquare className="text-blue-400" size={32} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">AI Support Assistants</h2>
            <p className="text-gray-400 text-sm text-center mb-8">Instant answers from your docs — 24/7, no extra headcount.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Trained on your docs', desc: 'Answers from your content, not generic AI.' },
              { title: 'Multi-platform', desc: 'Teams, Slack, web, or custom portal.' },
              { title: 'Escalation routing', desc: 'Can\'t answer? Routes to a human. No dead ends.' },
              { title: 'Usage analytics', desc: 'See what people ask. Find knowledge gaps.' },
            ].map((s, i) => (
              <div key={i} className="bg-gray-800/30 p-5 rounded-2xl border border-white/5">
                <h4 className="font-bold text-blue-400 text-sm mb-1">{s.title}</h4>
                <p className="text-gray-400 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-400/5 border border-blue-400/20 rounded-xl px-5 py-4">
            <p className="text-blue-300 text-xs text-center">
              In active development. Contact us to join early access.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;
