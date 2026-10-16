import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Target,
  Compass,
  Users,
  Award,
  Layers,
  HeartHandshake,
  Lightbulb,
} from 'lucide-react';

export const About = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 lg:py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#C9A227]/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
              Corporate Overview
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit'] tracking-tight leading-tight">
              Ideas Into Impact. <br />
              <span className="text-gradient-gold">Transforming Businesses</span> Through Integrated Digital Solutions.
            </h1>
            <p className="text-[#B5B5B5] text-base sm:text-lg leading-relaxed mt-4">
              <strong>INOVIQ GLOBAL PVT. LTD.</strong> is a modern digital services and enterprise solutions firm. We unify high-level visual design, reliable full-stack web applications, organic presence, performance marketing, and operational support.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] border border-[#3A321C] px-3 py-1 rounded-full">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Built For Businesses Demanding Cohesive Digital Excellence
              </h2>
              <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                Most businesses struggle when juggling separate vendors: one freelancer for logos, an agency for websites, another contractor for ads, and no unified direction.
              </p>
              <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
                INOVIQ Global was created to solve this fragmentation. By integrating creative visual artistry with full-stack MERN software engineering and verified digital channels, we ensure every aspect of your brand reinforces your commercial objectives.
              </p>
              <div className="p-4 rounded-2xl bg-[#171717] border border-[#3A321C] text-slate-300 text-xs sm:text-sm leading-relaxed">
                💡 <strong>Our Core Principle:</strong> We do not deploy superficial vanity metrics or exaggerated claims. Every project is built on honest consultation, high code quality, and verifiable deliverables.
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-[#171717] border border-[#3A321C]">
                <Target className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">Our Mission</h3>
                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed">
                  To empower enterprises and expanding regional brands with corporate-grade digital infrastructure, aesthetic superiority, and authentic audience growth.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-[#171717] border border-[#3A321C]">
                <Compass className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2 font-['Outfit']">Our Vision</h3>
                <p className="text-xs sm:text-sm text-[#B5B5B5] leading-relaxed">
                  To be the most trusted full-stack digital partner recognized for technical reliability, client satisfaction, and transparent business ethics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#0B0B0B] border-y border-[#3A321C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] border border-[#3A321C] px-3.5 py-1.5 rounded-full">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 font-['Outfit']">
              Our Five Guiding Pillars
            </h2>
            <p className="text-[#B5B5B5] text-sm mt-2">
              The ethical and operational standards behind every project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Customer-Focused Approach',
                desc: 'Deep requirement discovery ensuring deliverables match practical operational needs.',
                icon: HeartHandshake,
              },
              {
                title: 'Creative Solutions',
                desc: 'Original concepts, 3D renderings, and bespoke web architecture without generic templates.',
                icon: Lightbulb,
              },
              {
                title: 'Responsive Communication',
                desc: 'Prompt coordination via direct WhatsApp, email, and scheduled milestone reviews.',
                icon: Users,
              },
              {
                title: 'Quality-Focused Execution',
                desc: 'Rigorous cross-device testing, semantic SEO, vector perfection, and data safety.',
                icon: Award,
              },
              {
                title: 'Integrated Digital Services',
                desc: 'Seamless synergy connecting branding, websites, marketing, and business administration.',
                icon: Layers,
              },
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#171717] border border-[#3A321C] hover:border-[#D4AF37] shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#3A321C] text-[#D4AF37] flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-white mb-2 font-['Outfit']">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#B5B5B5] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Verification Statement */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-[#171717] text-white border border-[#3A321C] text-center">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#3A321C] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] mb-3 text-white">
              Transparency & Regulatory Alignment
            </h3>
            <p className="text-[#B5B5B5] text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-6">
              INOVIQ GLOBAL PVT. LTD. operates strictly within authorized commercial boundaries. We never claim certifications, awards, or customer numbers unless formally verified. For legal and statutory processes, our administrative facilitation connects you with duly qualified practicing professionals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#C9A227] to-[#B38F20] text-[#0B0B0B] text-xs font-bold transition-all shadow-md hover:shadow-lg hover:shadow-[#D4AF37]/25 hover:-translate-y-0.5"
            >
              <span>Connect With Our Team</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
