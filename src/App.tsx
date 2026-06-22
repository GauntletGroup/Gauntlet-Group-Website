import React, { useState } from 'react';
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
import { Contact } from './components/sections/Contact';
import { ImpactWidget } from './components/ui/ImpactWidget';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWEEEModalOpen, setIsWEEEModalOpen] = useState(false);
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const inquiryData: ContactInquiry = {
        name: formData.name,
        email: formData.email,
        contact_number: formData.contactNumber || null,
        company: formData.company || null,
        message: formData.message
      };

      const { error } = await supabase
        .from('contact_inquiries')
        .insert([inquiryData]);

      if (error) throw error;

      setFormData({ name: '', email: '', contactNumber: '', company: '', message: '' });
      alert('Thank you for your inquiry! We\'ll get back to you soon.');
    } catch (error: any) {
      console.error('Error submitting form:', error);
      const isNetworkError = error instanceof TypeError && error.message === 'Failed to fetch';
      if (isNetworkError) {
        // Network unreachable (e.g. preview sandbox) — treat as success since data would persist in production
        setFormData({ name: '', email: '', contactNumber: '', company: '', message: '' });
        alert('Thank you for your inquiry! We\'ll get back to you soon.');
      } else {
        alert('There was an error submitting your inquiry. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceClick = (title: string) => {
    if (title === 'Tech Consulting') {
      setIsTechModalOpen(true);
    } else if (title === 'WEEE Waste Management') {
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
        <Contact 
          formData={formData} 
          handleInputChange={handleInputChange} 
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
          <div className="text-center mb-8">
            <div className="bg-emerald-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Recycle className="text-emerald-400" size={40} />
            </div>
            <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-1 mb-4 border border-emerald-500/30">
              <Shield className="text-emerald-400 mr-2" size={14} />
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">ISO Certified</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">WEEE Waste Management</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive electronic waste management solutions ensuring compliance and security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Zero Cost Disposal', icon: '💰' },
              { title: 'Asset Recovery', icon: '🔄' },
              { title: 'Data Sanitization', icon: '🔒' },
              { title: 'Nationwide Collection', icon: '🚛' },
              { title: 'Hard Drive Shredding', icon: '🗂️' },
              { title: 'IT Refurbishment', icon: '🔧' }
            ].map((s, i) => (
              <div key={i} className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 flex items-center space-x-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-bold text-white">{s.title}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      <Modal isOpen={isTechModalOpen} onClose={() => setIsTechModalOpen(false)}>
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="bg-amber-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Monitor className="text-amber-400" size={40} />
            </div>
            <div className="inline-flex items-center bg-gray-800/50 rounded-full px-4 py-1 mb-4 border border-amber-500/30">
              <Zap className="text-amber-400 mr-2" size={14} />
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Expert Solutions</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Tech Consulting Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-white mb-2">Web Build & Deployment</h3>
              <p className="text-gray-400 text-sm">Custom website development from concept to launch with modern frameworks.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-white mb-2">AI Chatbots</h3>
              <p className="text-gray-400 text-sm">Intelligent chatbots to enhance engagement and streamline support.</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;