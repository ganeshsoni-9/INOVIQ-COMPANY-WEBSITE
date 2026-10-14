import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Palette,
  Code,
  Share2,
  TrendingUp,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Logo } from './Logo';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const serviceCategories = [
    {
      name: 'Graphic Design',
      path: '/services/graphic-design',
      icon: Palette,
      badge: '20 Services',
      description: 'Logos, visiting cards, video intros, packaging, 3D product renders & brochures.',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      name: 'Web Development',
      path: '/services/web-development',
      icon: Code,
      badge: 'Dynamic & E-com',
      description: 'MERN stack applications, e-commerce stores, digital cards, SEO & AI chatbots.',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      name: 'Digital Services',
      path: '/services/digital-services',
      icon: Share2,
      badge: 'Organic Growth',
      description: 'Google My Business, Facebook & Instagram optimization, social media handling.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      name: 'Marketing Services',
      path: '/services/marketing',
      icon: TrendingUp,
      badge: 'Lead Generation',
      description: 'Meta ads, compliant WhatsApp & SMS marketing, local geo-marketing & influencers.',
      color: 'text-rose-600 bg-rose-50',
    },
    {
      name: 'Legal & Business Support',
      path: '/services/legal-business-support',
      icon: ShieldCheck,
      badge: 'Compliance Support',
      description: 'Trademark assistance, company registration support, payments & WhatsApp API.',
      color: 'text-emerald-600 bg-emerald-50',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Contact Strip */}
      <div className="bg-[#0A192F] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>+91 80001 80600</span>
            </a>
            <a
              href="mailto:info@inoviqglobal.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>info@invoiqglobal.com</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>Sikar, Rajasthan, India</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] tracking-wide">
            <span className="hidden lg:inline text-slate-400">
              ⚡ Transform Your Business With Digital Excellence
            </span>
            <Link
              to="/get-a-quote"
              className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Request Quote</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-md'
            : 'bg-white/95 backdrop-blur-md py-4 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo variant="light" />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              About Us
            </NavLink>

            {/* Services Dropdown with Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-menu panel */}
              {servicesDropdownOpen && (
                <div className="absolute top-full -left-20 w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-200/80 p-5 mt-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Our 5 Core Service Domains
                    </span>
                    <Link
                      to="/services"
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      View All Services
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {serviceCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.path}
                          to={cat.path}
                          className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                        >
                          <div
                            className={`p-2.5 rounded-xl ${cat.color} group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                {cat.name}
                              </span>
                              <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                {cat.badge}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {cat.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-5 -mb-5 p-4 rounded-b-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Custom project scope? We craft bespoke corporate packages.</span>
                    </div>
                    <Link
                      to="/get-a-quote"
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                    >
                      Discuss Project
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/portfolio"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              Our Work
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              FAQ
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-blue-600 bg-blue-50 font-semibold'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/get-a-quote"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-xl shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[100px] z-40 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white h-[calc(100vh-100px)] overflow-y-auto px-6 py-6 border-t border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <NavLink
                to="/"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Home
              </NavLink>

              <NavLink
                to="/about"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                About Us
              </NavLink>

              {/* Mobile Services Accordion */}
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform ${
                      mobileServicesOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-4 pr-2 py-2 space-y-1.5 border-l-2 border-blue-500 ml-4 my-1">
                    <Link
                      to="/services"
                      className="block px-3 py-2 text-sm font-bold text-blue-600 hover:underline"
                    >
                      All Services Directory →
                    </Link>
                    {serviceCategories.map((cat) => (
                      <Link
                        key={cat.path}
                        to={cat.path}
                        className="block px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 font-medium"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink
                to="/portfolio"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Our Work
              </NavLink>

              <NavLink
                to="/faq"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                FAQ
              </NavLink>

              <NavLink
                to="/contact"
                className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Contact Us
              </NavLink>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 space-y-3 pb-8">
              <Link
                to="/get-a-quote"
                className="w-full py-3.5 text-center font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl block shadow-lg"
              >
                Get a Free Consultation
              </Link>
              <div className="text-center text-xs text-slate-500">
                Call us: <a href="tel:+919876543210" className="text-blue-600 font-medium">+91 80001 80600</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
