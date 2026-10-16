import React from 'react';
import {
  FileText,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { InquiryForm } from '../components/InquiryForm';

export const GetAQuote = () => {
  return (
    <div className="w-full bg-[#0B0B0B]">
      {/* Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 relative overflow-hidden border-b border-[#3A321C]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
            Complimentary Consultation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Request A Tailored Quotation
          </h1>
          <p className="text-[#B5B5B5] text-sm sm:text-base max-w-xl mx-auto mt-3">
            Receive a formal milestone proposal and transparent cost breakdown tailored to your brand’s commercial targets.
          </p>
        </div>
      </section>

      {/* Main Form + Process Breakdown */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: What Happens Next */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#171717] rounded-3xl p-8 border border-[#3A321C] shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  What Happens After You Submit?
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#E0E0E0] uppercase tracking-wider mb-1">
                        Instant Tracking Reference
                      </h4>
                      <p className="text-xs text-[#B5B5B5] leading-relaxed">
                        A unique reference number is generated on screen and an acknowledgement is sent to your email.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#E0E0E0] uppercase tracking-wider mb-1">
                        Specialist Assessment
                      </h4>
                      <p className="text-xs text-[#B5B5B5] leading-relaxed">
                        Our domain leads analyze your specifications, competitor landscape, and technical scope.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#E0E0E0] uppercase tracking-wider mb-1">
                        Structured Proposal Delivery
                      </h4>
                      <p className="text-xs text-[#B5B5B5] leading-relaxed">
                        We connect via your preferred contact channel (WhatsApp, Phone, or Email) with exact milestones and costs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#3A321C]/60 space-y-2 text-xs text-[#B5B5B5]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Average turnaround: Under 24 business hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Non-disclosure & strict privacy observed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Full Inquiry Form */}
            <div className="lg:col-span-7">
              <InquiryForm initialCategory="Web Development" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
