import React, { useState, useEffect } from 'react';
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
  Cpu,
  Code,
  Server,
  Wifi,
  HardDrive
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  // Floating particles component
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-${i % 4 + 1} opacity-60`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));
    return <>{particles}</>;
  };

  // Tech icons floating animation
  const FloatingTechIcons = () => {
    const icons = [Code, Server, Wifi, HardDrive, Database, Cpu];
    return (
      <>
        {icons.map((Icon, i) => (
          <div
            key={i}
            className={`absolute text-cyan-400/20 animate-tech-float-${i + 1}`}
            style={{
              left: `${10 + (i * 15)}%`,
              top: `${20 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <Icon size={24 + Math.random() * 16} />
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Cursor follower */}
      <div 
        className="fixed w-4 h-4 bg-cyan-400/30 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${mousePosition.x > 0 ? 1 : 0})`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-40 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 group">
                <img 
                  src="/Gauntlet Brand Transparent Background copy.png" 
                  alt="Gauntlet Group" 
                  className="h-12 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(184,134,11,0.5)]"
                />
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['About', 'Services', 'Why Us', 'Contact'].map((item, index) => (
                  <a 
                    key={item}
                    href={`#${item === 'Why Us' ? 'why-choose-us' : item.toLowerCase().replace(' ', '-')}`}
                    className="relative text-gray-300 hover:text-amber-400 px-3 py-2 text-sm font-medium transition-all duration-300 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute inset-0 bg-amber-400/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-blue-700 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
                <a 
                  href="#contact" 
                  className="relative bg-gradient-to-r from-amber-500 to-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium hover:from-amber-400 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/50 group overflow-hidden"
                >
                  <span className="relative z-10">Get Assessment</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-all duration-300 transform hover:scale-110"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 border-t border-cyan-500/20">
            {['About', 'Services', 'Why Us', 'Contact'].map((item, index) => (
              <a 
                key={item}
                href={`#${item === 'Why Us' ? 'why-choose-us' : item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-300 hover:text-amber-400 block px-3 py-2 text-base font-medium transition-all duration-300 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/50 to-amber-900/30" />
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Dynamic grid */}
          <div 
            className="absolute inset-0 bg-grid-pattern opacity-20"
            style={{
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
            }}
          />
          
          {/* Floating particles */}
          <FloatingParticles />
          
          {/* Tech icons */}
          <FloatingTechIcons />
          
          {/* Animated lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent animate-pulse-slow" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/50 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
          </div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 border border-amber-400/30 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-blue-400/30 rotate-12 animate-bounce-slow" />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-amber-400/20 to-blue-400/20 rounded-full animate-pulse-glow" />
        </div>

        <div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`
          }}
        >
          {/* Company Logo and Name */}
          <div className="mb-16 animate-fade-in-up">
            <div className="flex flex-col items-center justify-center space-y-8">
              <div className="relative group">
                <img 
                  src="/Gauntlet Brand Transparent Background copy.png" 
                  alt="Gauntlet Group Logo" 
                  className="h-32 md:h-40 lg:h-48 w-auto transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_30px_rgba(245,158,11,0.6)] animate-float"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-blue-600/20 rounded-full blur-3xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                GAUNTLET GROUP
              </h1>
            </div>
          </div>

          {/* Animated badge */}
          <div className="inline-flex items-center bg-gray-800/30 backdrop-blur-sm border border-cyan-500/50 rounded-full px-6 py-3 mb-8 animate-fade-in-up group hover:border-cyan-400 transition-all duration-300">
            <Zap className="text-amber-400 mr-2 animate-pulse" size={20} />
            <span className="text-amber-400 text-sm font-medium">Next-Gen Technology Solutions</span>
            <div className="absolute inset-0 bg-cyan-400/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="inline-block animate-slide-in-left text-white">Empowering</span>
            <br />
            <span className="inline-block animate-slide-in-right bg-gradient-to-r from-amber-400 via-blue-600 to-amber-600 bg-clip-text text-transparent animate-gradient-x">Circular Tech Solutions</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Gauntlet Group delivers innovative tech services and responsible e-waste recycling for a cleaner tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a 
              href="#contact" 
              className="group relative inline-flex items-center bg-gradient-to-r from-amber-500 to-blue-700 text-white px-10 py-5 rounded-full text-lg font-semibold hover:from-amber-400 hover:to-blue-600 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-amber-500/50 overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Get a Free Assessment
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform duration-300" size={20} />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-700" />
            </a>
            
            <a 
              href="#services" 
              className="group inline-flex items-center border-2 border-amber-400/50 text-amber-400 px-10 py-5 rounded-full text-lg font-semibold hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Explore Services</span>
              <div className="absolute inset-0 bg-amber-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </div>
          
          {/* Animated stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            {[
              { value: '100%', label: 'WEEE Compliant', delay: '1s' },
              { value: '24/7', label: 'Tech Support', delay: '1.2s' },
              { value: '500+', label: 'Projects Delivered', delay: '1.4s' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: stat.delay }}
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-scroll-indicator" />
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <Globe className="text-amber-400 mr-2 animate-spin-slow" size={20} />
              <span className="text-amber-400 text-sm font-medium">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              About <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Gauntlet Group</span>
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                At Gauntlet Group, we bridge the gap between cutting-edge technology and environmental responsibility. 
                Our mission is to empower businesses with innovative tech solutions while ensuring sustainable practices 
                through comprehensive WEEE recycling and compliance services.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                With deep expertise in WEEE directives and seamless tech integration, we help organizations build 
                a sustainable future without compromising on innovation. Our certified professionals ensure your 
                business stays compliant while maximizing technological potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <Database className="text-amber-400 mr-2 animate-pulse" size={20} />
              <span className="text-amber-400 text-sm font-medium">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Our <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Comprehensive solutions that combine technological excellence with environmental stewardship
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Monitor,
                title: 'Tech Consulting',
                description: 'Drive digital transformation with our expert IT infrastructure services. We help businesses modernize their technology stack while maintaining optimal performance and security.',
                color: 'amber',
                delay: '0.2s'
              },
              {
                icon: Recycle,
                title: 'WEEE Waste Management',
                description: 'Comprehensive collection, recycling, and compliance services for electronic waste. Ensure responsible disposal while meeting all regulatory requirements.',
                color: 'emerald',
                delay: '0.4s'
              },
              {
                icon: Shield,
                title: 'Compliance Advisory',
                description: 'Navigate complex environmental regulations with confidence. Our experts help companies achieve and maintain compliance with WEEE directives and sustainability standards.',
                color: 'blue',
                delay: '0.6s'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-700 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: service.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-blue-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                
                <div className={`bg-gradient-to-br from-${service.color}-500/20 to-${service.color === 'amber' ? 'blue' : service.color === 'emerald' ? 'green' : 'indigo'}-600/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 relative`}>
                  <service.icon className={`text-${service.color}-400 group-hover:scale-110 transition-transform duration-300`} size={40} />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className={`text-2xl font-bold text-white mb-6 group-hover:text-${service.color}-400 transition-colors duration-300`}>
                  {service.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 mb-6">
                  {service.description}
                </p>
                
                <div className={`flex items-center text-${service.color}-400 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse-slow" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <Cpu className="text-amber-400 mr-2 animate-spin-slow" size={20} />
              <span className="text-amber-400 text-sm font-medium">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Why Choose <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Gauntlet Group</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Experience the difference of working with industry leaders committed to excellence and sustainability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: '100% WEEE Compliant', description: 'Fully compliant processes ensuring your business meets all environmental regulations and standards.', color: 'amber', delay: '0.2s' },
              { icon: Leaf, title: 'Sustainable IT Practices', description: 'Environmentally conscious technology solutions that reduce carbon footprint and promote circular economy.', color: 'green', delay: '0.4s' },
              { icon: Users, title: 'Scalable Solutions', description: 'Flexible services that grow with your business, from startups to enterprise-level organizations.', color: 'blue', delay: '0.6s' },
              { icon: Award, title: 'Certified Professionals', description: 'Experienced team of certified experts dedicated to delivering exceptional results and ongoing support.', color: 'blue', delay: '0.8s' }
            ].map((item, index) => (
              <div 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: item.delay }}
              >
                <div className={`bg-gradient-to-br from-gray-800 to-gray-900 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-gray-700 group-hover:border-${item.color}-500/50 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-${item.color}-500/25 group-hover:scale-110 relative overflow-hidden`}>
                  <item.icon className={`text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`} size={40} />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className={`text-xl font-bold text-white mb-4 group-hover:text-${item.color}-400 transition-colors duration-300`}>
                  {item.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <Mail className="text-amber-400 mr-2 animate-pulse" size={20} />
              <span className="text-amber-400 text-sm font-medium">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Get In <span className="bg-gradient-to-r from-amber-400 to-blue-600 bg-clip-text text-transparent">Touch</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Ready to transform your business with sustainable tech solutions? Let's start the conversation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-900/50 backdrop-blur-sm p-10 rounded-2xl border border-gray-700/50 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address', type: 'email', required: true },
                  { name: 'company', label: 'Company Name', type: 'text', required: false }
                ].map((field, index) => (
                  <div key={field.name} className="group">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-amber-400 transition-colors duration-300">
                      {field.label} {field.required && '*'}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleInputChange}
                      required={field.required}
                      className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 group-focus-within:bg-gray-800/70"
                      placeholder={`Your ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}

                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-amber-400 transition-colors duration-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 resize-none group-focus-within:bg-gray-800/70"
                    placeholder="Tell us about your project or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-blue-700 text-white py-4 px-8 rounded-xl font-semibold hover:from-amber-400 hover:to-blue-600 transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg hover:shadow-amber-500/50 relative overflow-hidden group"
                >
                  <span className="relative z-10">Submit Inquiry</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-blue-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">Alternative Contact Methods</h3>
                <div className="space-y-8">
                  {[
                    { icon: Mail, title: 'Email', details: ['contact@gauntlet-group.com'], color: 'amber' },
                    { icon: Phone, title: 'Phone', details: ['+44 7800 721443'], color: 'emerald' },
                    { icon: MapPin, title: 'Office', details: ['Peterborough', 'United Kingdom'], color: 'blue' }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-start space-x-6 group">
                      <div className={`bg-gradient-to-br from-${contact.color}-500/20 to-${contact.color === 'amber' ? 'blue' : contact.color === 'emerald' ? 'green' : 'indigo'}-600/20 p-4 rounded-xl border border-${contact.color}-500/30 group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className={`text-${contact.color}-400`} size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                          {contact.title}
                        </h4>
                        {contact.details.map((detail, i) => (
                          <p key={i} className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 group hover:border-cyan-500/50 transition-all duration-500">
                <h4 className="font-bold text-white mb-4 group-hover:text-amber-400 transition-colors duration-300">
                  Ready to Get Started?
                </h4>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Schedule a free consultation to discuss your technology and sustainability goals.
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center text-amber-400 font-semibold hover:text-amber-300 transition-colors group-hover:translate-x-2 transform duration-300"
                >
                  Book a consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden border-t border-gray-800/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900/50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <img 
                  src="/Gauntlet Brand Transparent Background copy.png" 
                  alt="Gauntlet Group" 
                  className="h-16 w-auto hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="text-gray-300 mb-8 max-w-md leading-relaxed">
                Empowering businesses with innovative technology solutions and responsible e-waste management 
                for a sustainable future.
              </p>
              <div className="flex space-x-4">
                {[Linkedin, Twitter].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50 hover:border-cyan-500/50 hover:bg-gray-700/50 transition-all duration-300 group transform hover:scale-110"
                    aria-label={Icon === Linkedin ? 'LinkedIn' : 'Twitter'}
                  >
                    <Icon className="group-hover:text-cyan-400 transition-colors duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-amber-400">Quick Links</h4>
              <div className="space-y-3">
                {['About Us', 'Services', 'Why Choose Us', 'Contact'].map((link, index) => (
                  <a 
                    key={index}
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="block text-gray-400 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-6 text-amber-400">Services</h4>
              <div className="space-y-3">
                {['Tech Consulting', 'WEEE Management', 'Compliance Advisory', 'Free Assessment'].map((service, index) => (
                  <a 
                    key={index}
                    href="#services" 
                    className="block text-gray-400 hover:text-amber-400 transition-all duration-300 transform hover:translate-x-2"
                  >
                    {service}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-16 pt-8 text-center">
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