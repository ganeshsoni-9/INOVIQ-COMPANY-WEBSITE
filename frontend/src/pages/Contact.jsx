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
    <div className="w-full bg-[#0B0B0B]">
      {/* Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 relative overflow-hidden border-b border-[#3A321C]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
            Let's Start A Conversation
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Contact INOVIQ Global
          </h1>

          <p className="text-[#B5B5B5] text-sm sm:text-base max-w-xl mx-auto mt-3">
            Have a project in mind or need advisory on your digital presence?
            Our specialists are available for inquiries, proposals, and
            consultations.
          </p>
        </div>
      </section>

      {/* Main Grid: Details + Form */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#171717] rounded-3xl p-8 border border-[#3A321C] shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-2">
                    Get In Touch
                  </h3>

                  <p className="text-xs text-[#B5B5B5] leading-relaxed">
                    Reach our corporate desk through any of the channels below.
                    We respond promptly during official business hours.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm">

                  {/* Phone */}
                  <a
                    href="tel:+918000180600"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#111111] hover:bg-[#1f1f1f] border border-[#3A321C] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#D4AF37] border border-[#3A321C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
                        Telephone Inquiries
                      </span>

                      <span className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        +91 80001 80600
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/918000180600?text=Hello%20INOVIQ%20Global%2C%20I%20have%20an%20inquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#111111] hover:bg-[#1f1f1f] border border-[#3A321C] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#25D366] border border-[#3A321C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
                        Instant WhatsApp Chat
                      </span>

                      <span className="font-bold text-white group-hover:text-[#25D366] transition-colors">
                        +91 80001 80600
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:info@inoviqglobal.com"
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#111111] hover:bg-[#1f1f1f] border border-[#3A321C] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#D4AF37] border border-[#3A321C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
                        Official Correspondence
                      </span>

                      <span className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                        info@inoviqglobal.com
                      </span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#111111] border border-[#3A321C]">
                    <div className="w-10 h-10 rounded-xl bg-[#171717] text-[#D4AF37] border border-[#3A321C] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#888888] uppercase tracking-wider block">
                        Registered Office
                      </span>

                      <span className="font-semibold text-white leading-snug">
                        2nd Floor, Bhawani Plaza,
                        Chandpol Gate, Sikar,
                        Rajasthan 332001
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Map Preview */}
              <div className="bg-[#171717] rounded-3xl p-6 text-white border border-[#3A321C] relative overflow-hidden">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />

                  <h4 className="font-bold text-sm font-['Outfit']">
                    Strategic Hub in Sikar, Rajasthan
                  </h4>
                </div>

                <p className="text-xs text-[#B5B5B5] leading-relaxed">
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