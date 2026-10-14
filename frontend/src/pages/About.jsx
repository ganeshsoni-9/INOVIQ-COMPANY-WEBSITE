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
      <section className="bg-[#0A192F] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700">
              Corporate Overview
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit'] tracking-tight leading-tight">
              Ideas Into Impact. <br />
              <span className="text-gradient-blue">Transforming Businesses</span> Through Integrated Digital Solutions.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mt-4">
              <strong>INOVIQ GLOBAL PVT. LTD.</strong> is a modern digital services and enterprise solutions firm. We unify high-level visual design, reliable full-stack web applications, organic presence, performance marketing, and operational support.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
                Built For Businesses Demanding Cohesive Digital Excellence
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Most businesses struggle when juggling separate vendors: one freelancer for logos, an agency for websites, another contractor for ads, and no unified direction.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                INOVIQ Global was created to solve this fragmentation. By integrating creative visual artistry with full-stack MERN software engineering and verified digital channels, we ensure every aspect of your brand reinforces your commercial objectives.
              </p>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-blue-900 text-xs sm:text-sm leading-relaxed">
                💡 <strong>Our Core Principle:</strong> We do not deploy superficial vanity metrics or exaggerated claims. Every project is built on honest consultation, high code quality, and verifiable deliverables.
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                <Target className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To empower enterprises and expanding regional brands with corporate-grade digital infrastructure, aesthetic superiority, and authentic audience growth.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                <Compass className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Outfit']">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To be the most trusted full-stack digital partner recognized for technical reliability, client satisfaction, and transparent business ethics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3.5 py-1.5 rounded-full">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Our Five Guiding Pillars
            </h2>
            <p className="text-slate-600 text-sm mt-2">
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
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-2 font-['Outfit']">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance & Verification Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] mb-3">
              Transparency & Regulatory Alignment
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto mb-6">
              INOVIQ GLOBAL PVT. LTD. operates strictly within authorized commercial boundaries. We never claim certifications, awards, or customer numbers unless formally verified. For legal and statutory processes, our administrative facilitation connects you with duly qualified practicing professionals.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 text-xs font-bold transition-colors"
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
