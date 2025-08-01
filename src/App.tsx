import React, { useState } from 'react';
import { 
  Monitor, 
  Recycle, 
  Shield, 
  CheckCircle, 
  Leaf, 
  Users, 
  Award,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Linkedin,
  Twitter,
  ArrowRight,
  Zap,
  Globe,
  Database,
  Cpu
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-xl z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">
                  <span className="text-cyan-400">Gauntlet</span> Group
                </h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#about" className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-all duration-300 hover:glow">
                  About
                </a>
                <a href="#services" className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-all duration-300 hover:glow">
                  Services
                </a>
                <a href="#why-choose-us" className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-all duration-300 hover:glow">
                  Why Us
                </a>
                <a href="#contact" className="text-gray-300 hover:text-cyan-400 px-3 py-2 text-sm font-medium transition-all duration-300 hover:glow">
                  Contact
                </a>
                <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  Get Assessment
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              <a href="#about" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors">
                About
              </a>
              <a href="#services" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors">
                Services
              </a>
              <a href="#why-choose-us" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors">
                Why Us
              </a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 block px-3 py-2 text-base font-medium transition-colors">
                Contact
              </a>
              <a href="#contact" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white block px-3 py-2 rounded-full text-base font-medium hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 mt-2">
                Get Assessment
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Tech Grid Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-cyan-300 rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-300 rounded-full animate-pulse delay-3000"></div>
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-cyan-500 rounded-full animate-pulse delay-500"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-cyan-400/20 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border border-blue-400/20 rotate-12 animate-float"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tech badge */}
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
            <Zap className="text-cyan-400 mr-2" size={16} />
            <span className="text-cyan-400 text-sm font-medium">Next-Gen Technology Solutions</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering Circular
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Tech Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Gauntlet Group delivers innovative tech services and responsible e-waste recycling for a cleaner tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#contact" 
              className="group relative inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
            >
              <span className="relative z-10">Get a Free Assessment</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </a>
            
            <a 
              href="#services" 
              className="inline-flex items-center border-2 border-cyan-400/50 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
            >
              Explore Services
            </a>
          </div>
          
          {/* Tech stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">100%</div>
              <div className="text-sm text-gray-400">WEEE Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">24/7</div>
              <div className="text-sm text-gray-400">Tech Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">500+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Globe className="text-cyan-400 mr-2" size={16} />
              <span className="text-cyan-400 text-sm font-medium">About Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              About Gauntlet Group
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At Gauntlet Group, we bridge the gap between cutting-edge technology and environmental responsibility. 
                Our mission is to empower businesses with innovative tech solutions while ensuring sustainable practices 
                through comprehensive WEEE recycling and compliance services.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                With deep expertise in WEEE directives and seamless tech integration, we help organizations build 
                a sustainable future without compromising on innovation. Our certified professionals ensure your 
                business stays compliant while maximizing technological potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-800 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-700/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Database className="text-cyan-400 mr-2" size={16} />
              <span className="text-cyan-400 text-sm font-medium">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions that combine technological excellence with environmental stewardship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tech Consulting */}
            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Monitor className="text-cyan-400 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Tech Consulting</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Drive digital transformation with our expert IT infrastructure services. We help businesses 
                modernize their technology stack while maintaining optimal performance and security.
              </p>
              <div className="mt-6 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="ml-2" size={16} />
              </div>
            </div>

            {/* WEEE Waste Management */}
            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10">
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-emerald-400/30 group-hover:to-green-500/30 transition-all duration-300">
                <Recycle className="text-emerald-400 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">WEEE Waste Management</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Comprehensive collection, recycling, and compliance services for electronic waste. 
                Ensure responsible disposal while meeting all regulatory requirements.
              </p>
              <div className="mt-6 flex items-center text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="ml-2" size={16} />
              </div>
            </div>

            {/* Compliance Advisory */}
            <div className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:from-purple-400/30 group-hover:to-indigo-500/30 transition-all duration-300">
                <Shield className="text-purple-400 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">Compliance Advisory</h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                Navigate complex environmental regulations with confidence. Our experts help companies 
                achieve and maintain compliance with WEEE directives and sustainability standards.
              </p>
              <div className="mt-6 flex items-center text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span className="text-sm font-medium">Learn More</span>
                <ArrowRight className="ml-2" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Cpu className="text-cyan-400 mr-2" size={16} />
              <span className="text-cyan-400 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Choose Gauntlet Group
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Experience the difference of working with industry leaders committed to excellence and sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 100% WEEE Compliant */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                <CheckCircle className="text-emerald-400 group-hover:scale-110 transition-transform" size={40} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">100% WEEE Compliant</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Fully compliant processes ensuring your business meets all environmental regulations and standards.
              </p>
            </div>

            {/* Sustainable IT Practices */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700 group-hover:border-green-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-500/25">
                <Leaf className="text-green-400 group-hover:scale-110 transition-transform" size={40} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-green-400 transition-colors">Sustainable IT Practices</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Environmentally conscious technology solutions that reduce carbon footprint and promote circular economy.
              </p>
            </div>

            {/* Scalable Solutions */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/25">
                <Users className="text-cyan-400 group-hover:scale-110 transition-transform" size={40} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Scalable Solutions</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Flexible services that grow with your business, from startups to enterprise-level organizations.
              </p>
            </div>

            {/* Certified Professionals */}
            <div className="text-center group">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                <Award className="text-blue-400 group-hover:scale-110 transition-transform" size={40} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">Certified Professionals</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Experienced team of certified experts dedicated to delivering exceptional results and ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-800"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-700/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
              <Mail className="text-cyan-400 mr-2" size={16} />
              <span className="text-cyan-400 text-sm font-medium">Contact Us</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Ready to transform your business with sustainable tech solutions? Let's start the conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project or questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-cyan-500/25"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Alternative Contact Methods</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 p-3 rounded-xl border border-cyan-500/30">
                      <Mail className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-gray-400">info@gauntletgroup.com</p>
                      <p className="text-gray-400">support@gauntletgroup.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 p-3 rounded-xl border border-emerald-500/30">
                      <Phone className="text-emerald-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                      <p className="text-gray-400">+1 (555) 987-6543</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-indigo-600/20 p-3 rounded-xl border border-purple-500/30">
                      <MapPin className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Office</h4>
                      <p className="text-gray-400">
                        123 Tech Plaza, Suite 400<br />
                        Innovation District<br />
                        City, State 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50">
                <h4 className="font-bold text-white mb-3">Ready to Get Started?</h4>
                <p className="text-gray-400 mb-4">
                  Schedule a free consultation to discuss your technology and sustainability goals.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group"
                >
                  Book a consultation
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-cyan-400">Gauntlet</span> Group
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering businesses with innovative technology solutions and responsible e-waste management 
                for a sustainable future.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="group-hover:text-cyan-400 transition-colors" size={20} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter className="group-hover:text-cyan-400 transition-colors" size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  About Us
                </a>
                <a href="#services" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Services
                </a>
                <a href="#why-choose-us" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Why Choose Us
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <div className="space-y-2">
                <a href="#services" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Tech Consulting
                </a>
                <a href="#services" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  WEEE Management
                </a>
                <a href="#services" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Compliance Advisory
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                  Free Assessment
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              Copyright © 2025 Gauntlet Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;