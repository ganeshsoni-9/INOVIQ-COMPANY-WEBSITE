import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Building2,
} from 'lucide-react';
import { InquiryForm } from '../components/InquiryForm';

export const Contact = () => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-[#0A192F] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700">
            Let's Start A Conversation
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Contact INOVIQ Global
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-3">
            Have a project in mind or need advisory on your digital presence?
            Our specialists are available for inquiries, proposals, and
            consultations.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-['Outfit'] mb-2">
                    Get In Touch
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    Reach our corporate desk through any of the channels below.
                    We respond promptly during official business hours.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">

                  {/* Phone */}
                  <a
                    href="tel:+918000180600"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Telephone Inquiries
                      </span>

                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        +91 80001 80600
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918000180600?text=Hello%20INOVIQ%20Global%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Instant WhatsApp Chat
                      </span>

                      <span className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                        +91 80001 80600
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@inoviqglobal.com"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Official Correspondence
                      </span>

                      <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        info@inoviqglobal.com
                      </span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Registered Office
                      </span>

                      <span className="font-semibold text-slate-800 leading-snug">
                        2nd Floor, Bhawani Plaza,
                        Chandpol Gate, Sikar,
                        Rajasthan 332001
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-6 h-6 text-cyan-400" />

                  <h4 className="font-bold text-sm font-['Outfit']">
                    Strategic Hub in Sikar, Rajasthan
                  </h4>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Serving clients locally across Rajasthan, nationwide
                  throughout India, and internationally with digital
                  communication pipelines.
                </p>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7">
              <InquiryForm initialCategory="General Inquiry" />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;