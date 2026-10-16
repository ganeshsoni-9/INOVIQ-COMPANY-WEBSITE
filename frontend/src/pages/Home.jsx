import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Palette,
  Code,
  Share2,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Layers,
  Zap,
  Globe,
  Award,
  Users,
  Compass,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Shield,
  FileCheck,
} from 'lucide-react';
import { InquiryModal } from '../components/InquiryModal';
import { CategoryWiseServicesSection } from '../components/CategoryWiseServicesSection';
import { fetchServices, fetchPortfolio } from '../services/api';

export const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({ category: 'Graphic Design', title: '' });
  const [activeFaq, setActiveFaq] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [portfolioFilter, setPortfolioFilter] = useState('all');

  useEffect(() => {
    // Load published services and portfolio projects
    fetchServices()
      .then((res) => {
        if (res.data) setServices(res.data);
      })
      .catch((err) => console.warn('Could not load services:', err.message));

    fetchPortfolio()
      .then((res) => {
        if (res.data) setPortfolioProjects(res.data);
      })
      .catch((err) => console.warn('Could not load portfolio:', err.message));
  }, []);

  const openInquiry = (category, title = '') => {
    setSelectedService({ category, title });
    setModalOpen(true);
  };

  const categories = [
    {
      title: 'Graphic Design Services',
      slug: 'graphic-design',
      count: '20 Specialized Services',
      path: '/services/graphic-design',
      icon: Palette,
      gradient: 'from-purple-600 to-indigo-600',
      description:
        'Transform your brand with custom 2D/3D logos, luxury visiting cards, cinematic intro videos, packaging, and high-impact brochures.',
      highlights: ['2D & 3D Logo Design', 'Packaging & Box Design', 'Promotional Videos', 'Company Profiles'],
    },
    {
      title: 'Web Development Services',
      slug: 'web-development',
      count: 'Dynamic & Scalable',
      path: '/services/web-development',
      icon: Code,
      gradient: 'from-blue-600 to-cyan-500',
      description:
        'Full-stack MERN dynamic websites, custom e-commerce stores, digital business cards, technical SEO, and intelligent customer support chatbots.',
      highlights: ['Dynamic Web Portals', 'Headless E-commerce', 'NFC Digital Cards', 'AI Support Chatbots'],
    },
    {
      title: 'Digital Services',
      slug: 'digital-services',
      count: 'Organic Visibility',
      path: '/services/digital-services',
      icon: Share2,
      gradient: 'from-cyan-500 to-teal-500',
      description:
        'Professional Google Business Profile setup, Facebook & Instagram brand page creation, organic follower growth, and multi-channel social handling.',
      highlights: ['Google Business Profile', 'Instagram Page Setup', 'Social Media Handling', 'Marketplace Storefronts'],
    },
    {
      title: 'Marketing Services',
      slug: 'marketing',
      count: 'Targeted Acquisition',
      path: '/services/marketing',
      icon: TrendingUp,
      gradient: 'from-rose-500 to-orange-500',
      description:
        'Precision Meta ad campaigns, compliant bulk WhatsApp messaging, SMS text alerts, hyper-local marketing, and vetted influencer collaborations.',
      highlights: ['Meta Ads Funnels', 'Consent-based WhatsApp', 'Local Geo-Fencing', 'Influencer Marketing'],
    },
    {
      title: 'Legal & Business Support',
      slug: 'legal-business-support',
      count: 'Administrative Facilitation',
      path: '/services/legal-business-support',
      icon: ShieldCheck,
      gradient: 'from-emerald-600 to-teal-600',
      description:
        'Documentation assistance for trademark searches, company formation, payment gateway onboarding, domain registration, and official WhatsApp Business API.',
      highlights: ['Trademark Search Support', 'Company Incorporation Aid', 'Payment Gateways', 'Enterprise WhatsApp API'],
      disclaimer: 'Administrative facilitation coordinated with practicing professionals.',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Understand Requirements',
      desc: 'We conduct an in-depth requirement discovery to evaluate your target audience, commercial goals, brand aesthetic, and technical scope.',
    },
    {
      number: '02',
      title: 'Plan & Strategize',
      desc: 'Our specialists formulate an actionable milestone roadmap, information architecture, wireframes, and strategic execution timelines.',
    },
    {
      number: '03',
      title: 'Design & Develop',
      desc: 'Our creative and engineering teams craft pixel-perfect visual collateral, write performant clean code, and integrate core workflows.',
    },
    {
      number: '04',
      title: 'Review & Deliver',
      desc: 'Rigorous cross-browser testing, quality assurance checks, feedback refinements, and smooth deployment to production infrastructure.',
    },
    {
      number: '05',
      title: 'Support & Improve',
      desc: 'We provide post-launch assistance, continuous performance monitoring, updates, and scalable iterations as your business grows.',
    },
  ];

  const faqs = [
    {
      q: 'What service domains does INOVIQ GLOBAL PVT. LTD. specialize in?',
      a: 'We provide integrated digital solutions spanning Graphic Design (branding, packaging, videos), Web Development (MERN stack web apps, e-commerce, digital cards), Digital Services (Google profiles, social handling), Marketing Services (Meta ads, WhatsApp marketing, local promotions), and Legal & Business Support (administrative facilitation for trademarks, company setups, and payment gateways).',
    },
    {
      q: 'How do I request a project quotation or consultation?',
      a: 'You can submit an inquiry through our Get a Quote page, use the inquiry button on any service card, or message us on WhatsApp. You will receive an instant unique reference number, and our team will get in touch within 24 business hours.',
    },
    {
      q: 'What is the typical timeline for website development or graphic design projects?',
      a: 'Design assignments like logos or business collateral typically take 3 to 7 business days. Full-scale dynamic websites or e-commerce web applications usually range from 2 to 4 weeks depending on the feature scope and revision rounds.',
    },
    {
      q: 'Do you guarantee follower numbers, Google rankings, or legal approvals?',
      a: 'No. INOVIQ GLOBAL operates with transparency and integrity. We implement industry best practices, authentic organic growth strategies, and high-standard engineering. We do not use fake bots, promise unnatural follower counts, or claim guaranteed first-page rankings. For legal and statutory matters, we provide administrative documentation assistance coordinated through qualified practicing professionals.',
    },
    {
      q: 'Can INOVIQ GLOBAL tailor a custom package combining multiple services?',
      a: 'Yes. Many clients combine brand identity design with a dynamic website and local marketing campaigns. We create unified corporate packages tailored to your commercial budget and growth stage.',
    },
  ];

  const filteredPortfolio =
    portfolioFilter === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.categorySlug === portfolioFilter);

  return (
    <div className="w-full">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D4AF37]/15 via-[#C9A227]/10 to-[#F5E6B3]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-glow"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#171717] border border-[#3A321C] text-[#D4AF37] text-xs sm:text-sm font-semibold shadow-inner">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Premier Digital & Business Solutions</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] leading-[1.12]">
                Ideas Into Impact. <br />
                <span className="text-gradient-gold">Digital Solutions</span> That Grow Your Business.
              </h1>

              <p className="text-[#B5B5B5] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                INOVIQ GLOBAL PVT. LTD. empowers forward-thinking enterprises with high-caliber Graphic Design, modern MERN Web Applications, Organic Digital Visibility, Performance Marketing, and Essential Business Support.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/get-a-quote"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B38F20] shadow-xl hover:shadow-[#D4AF37]/25 hover:from-[#C9A227] hover:to-[#A68018] transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/services"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-[#171717] hover:bg-[#222222] border border-[#3A321C] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Our Services</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#3A321C] text-left max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">5 Core</div>
                  <div className="text-xs text-[#B5B5B5]">Integrated Domains</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#D4AF37] font-['Outfit']">48+</div>
                  <div className="text-xs text-[#B5B5B5]">Catalogued Services</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-[#D4AF37] font-['Outfit']">100%</div>
                  <div className="text-xs text-[#B5B5B5]">Quality Execution</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Animated Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Floating Central Glass Card */}
                <div className="relative bg-gradient-to-b from-[#171717] to-[#111111] border border-[#3A321C] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
                  {/* Window Controls */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#3A321C] mb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-[11px] font-mono text-[#B5B5B5]">INOVIQ-ecosystem.js</span>
                  </div>

                  {/* Core Services Visual List */}
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#171717] border border-[#3A321C] flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white">Visual Identity & 3D</div>
                        <div className="text-[10px] text-[#B5B5B5]">20+ graphic & packaging services</div>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                        Branding
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#171717] border border-[#3A321C] flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                        <Code className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white">MERN Web Applications</div>
                        <div className="text-[10px] text-[#B5B5B5]">Dynamic portals, e-com & AI support</div>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                        Full-Stack
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#171717] border border-[#3A321C] flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-bold text-white">Strategic Marketing</div>
                        <div className="text-[10px] text-[#B5B5B5]">Targeted Meta ads & WhatsApp channels</div>
                      </div>
                      <span className="text-[10px] text-[#D4AF37] font-semibold bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                        Growth
                      </span>
                    </div>
                  </div>

                  {/* Consultation Banner Inside Mockup */}
                  <div className="mt-6 pt-4 border-t border-[#3A321C] flex items-center justify-between text-xs">
                    <span className="text-[#B5B5B5]">Client Acquisition Ready</span>
                    <button
                      onClick={() => openInquiry('General Inquiry', 'Hero Consultation')}
                      className="text-[#D4AF37] hover:text-[#F5E6B3] font-bold flex items-center gap-1"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <div className="absolute -top-5 -left-6 bg-[#171717] border border-[#3A321C] p-3 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 animate-float">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white">Verified Business</div>
                    <div className="text-[9px] text-[#B5B5B5]">Corporate Quality Standards</div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -bottom-6 -right-6 bg-[#171717] border border-[#3A321C] p-3 rounded-2xl shadow-xl backdrop-blur-md hidden sm:flex items-center gap-2.5 animate-float-reverse">
                  <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white">Fast Turnaround</div>
                    <div className="text-[9px] text-[#B5B5B5]">Milestone-Driven Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST & ABOUT INTRO SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#3A321C]/40 text-xs font-bold uppercase tracking-wider">
                <span>About INOVIQ Global</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] leading-tight">
                Architecting Modern Digital Success For Progressive Businesses
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                At <strong>INOVIQ GLOBAL PVT. LTD.</strong>, we bridge the gap between creative visual artistry, robust web software engineering, and strategic market expansion. We believe impactful digital solutions require seamless synergy across branding, web technology, and customer acquisition.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you need high-end corporate identity collateral, a high-converting MERN dynamic web application, or administrative support formalizing your digital payment and enterprise channels, our multidisciplinary team delivers precision, speed, and integrity.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-[#D4AF37] hover:text-[#C9A227] group text-sm"
                >
                  <span>Learn More About Our Philosophy & Team</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1 font-['Outfit']">
                  Integrated Execution
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Design, development, and marketing working together under one cohesive strategy.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1 font-['Outfit']">
                  Bespoke Creativity
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tailored 2D/3D brand graphics, video intros, and packaging that elevate corporate perception.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4">
                  <Code className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1 font-['Outfit']">
                  Modern MERN Stack
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fast, secure, mobile-first web applications engineered with React, Node, and MongoDB.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#D4AF37] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1 font-['Outfit']">
                  Compliance & Transparency
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Honest timelines, compliant messaging channels, and clear administrative facilitation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= inoviq CATEGORY-WISE SERVICES & WORK SECTION ================= */}
      <CategoryWiseServicesSection
        title="Inoviq Services Directory"
        subtitle="Explore our comprehensive suite of 48+ services across 5 specialized business categories. Click any domain to view all dedicated service cards with full descriptions and instant quotation."
      />

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 border border-[#3A321C]/40 px-3.5 py-1.5 rounded-full">
              The INOVIQ Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Why Progressive Businesses Choose Us
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Built on transparency, technical excellence, and dedication to real client business impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Customer-Focused Approach',
                desc: 'We listen first. Every deliverable is calibrated around your exact commercial goals and audience.',
                icon: Users,
              },
              {
                title: 'Creative Solutions',
                desc: 'Tailored aesthetic designs and innovative software frameworks that make your brand stand apart.',
                icon: Sparkles,
              },
              {
                title: 'Responsive Communication',
                desc: 'Direct interaction with assigned project managers via WhatsApp, email, and phone consultations.',
                icon: MessageSquare,
              },
              {
                title: 'Quality-Focused Execution',
                desc: 'Stringent code quality audits, vector print accuracy, and thorough cross-browser verification.',
                icon: Award,
              },
              {
                title: 'Integrated Digital Services',
                desc: 'Single partner handling your creative branding, web apps, marketing campaigns, and business setup.',
                icon: Layers,
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-[#D4AF37] hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 font-['Outfit']">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 5-STEP PROCESS SECTION ================= */}
      <section className="py-20 bg-[#0B0B0B] text-white relative overflow-hidden border-y border-[#3A321C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
              Structured Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-['Outfit']">
              Our 5-Step Delivery Process
            </h2>
            <p className="text-[#B5B5B5] text-sm sm:text-base mt-2">
              From initial consultation to final production release and continuous support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-[#171717] border border-[#3A321C] flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold font-mono text-[#D4AF37] block mb-3">
                    {step.number}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2 font-['Outfit']">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#B5B5B5] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#D4AF37]/60">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => openInquiry('General Inquiry', '5-Step Process Start')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] shadow-lg shadow-[#D4AF37]/20 transition-all"
            >
              <span>Initiate Your Project With Step 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROJECTS / PORTFOLIO ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 border border-[#3A321C]/40 px-3.5 py-1.5 rounded-full">
                Work Demonstration
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
                Featured Demonstration Projects
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl">
                Curated demonstration projects and case studies showcasing our standards across visual identity, MERN engineering, and campaigns.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'graphic-design', label: 'Graphic Design' },
                { id: 'web-development', label: 'Web Dev' },
                { id: 'marketing', label: 'Marketing' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPortfolioFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    portfolioFilter === f.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] font-bold shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Demonstration Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPortfolio.map((project) => (
              <div
                key={project.slug}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B0B0B] px-2.5 py-1 rounded-full shadow">
                      {project.category}
                    </span>
                    {project.isSample && (
                      <span className="text-[10px] font-semibold bg-[#171717]/80 backdrop-blur-sm text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#3A321C]">
                        Demo Project
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1">
                      Industry: {project.clientIndustry}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Outfit'] group-hover:text-[#D4AF37] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="text-xs font-bold text-[#D4AF37] hover:text-[#C9A227] flex items-center gap-1"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => openInquiry(project.category, `Similar to ${project.title}`)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                    >
                      Enquire Similar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-bold text-sm text-[#D4AF37] hover:text-[#C9A227] hover:underline"
            >
              <span>Explore All Case Studies In Detail →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / CLIENT FEEDBACK PLACEHOLDER ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 border border-[#3A321C]/40 px-3.5 py-1.5 rounded-full">
              Client Feedback Framework
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Client Reviews & Satisfaction
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              [Note: To uphold honest business principles, client testimonials below are formatted placeholders awaiting official authenticated client reviews].
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                role: 'Demonstration Client Review',
                service: 'Full-Stack MERN Website & SEO',
                quote:
                  '“The team delivered our dynamic portal with impressive speed and clean UI. The inquiry management system made capturing overseas buyers straightforward.”',
                status: 'Verified Project Scope Prototype',
              },
              {
                role: 'Demonstration Client Review',
                service: '3D Logo & Retail Packaging Design',
                quote:
                  '“Our product packaging completely stands out on retail shelves. The vector die-lines were print-vendor ready without any friction.”',
                status: 'Verified Project Scope Prototype',
              },
              {
                role: 'Demonstration Client Review',
                service: 'Local Area Marketing & Meta Ads',
                quote:
                  '“Targeted ads brought consistent footfall to our clinic location within two weeks. Highly professional communication and transparent metrics.”',
                status: 'Verified Project Scope Prototype',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#D4AF37] mb-4 text-sm">
                    ★★★★★
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed mb-6">
                    {t.quote}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-900">{t.role}</div>
                  <div className="text-[11px] text-[#D4AF37] font-semibold">{t.service}</div>
                  <span className="text-[10px] text-slate-400 block mt-1">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#D4AF37]/10 border border-[#3A321C]/40 px-3.5 py-1.5 rounded-full">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Answers to common queries regarding our services, procedures, and deliverables.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 hover:text-[#D4AF37] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-['Outfit']">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-[#D4AF37]/10 border border-[#3A321C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-sm text-slate-900">Have a specific question not answered here?</h4>
              <p className="text-xs text-slate-500">Our customer team is available for direct inquiries.</p>
            </div>
            <Link
              to="/faq"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] text-[#0B0B0B] font-bold text-xs transition-colors shrink-0"
            >
              Browse Complete FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FINAL STRONG CTA ================= */}
      <section className="py-20 bg-gradient-to-b from-[#0B0B0B] via-[#171717] to-[#0B0B0B] border-t border-[#3A321C] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
            Let's Collaborate
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 font-['Outfit']">
            Ready To Convert Your Ideas Into <span className="text-gradient-gold">Measurable Impact</span>?
          </h2>
          <p className="text-[#B5B5B5] text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Partner with INOVIQ GLOBAL PVT. LTD. for precision design, modern web applications, and strategic business growth. Request a detailed consultation or quotation today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openInquiry('General Inquiry', 'Final CTA Discuss Project')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B38F20] shadow-xl hover:shadow-[#D4AF37]/25 hover:from-[#C9A227] hover:to-[#A68018] transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/get-a-quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white bg-[#171717] hover:bg-[#222222] border border-[#3A321C] transition-all flex items-center justify-center gap-2"
            >
              <span>Request Detailed Quote</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reusable Inquiry Modal */}
      <InquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedService.category}
        serviceTitle={selectedService.title}
      />
    </div>
  );
};
