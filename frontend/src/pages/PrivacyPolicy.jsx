import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const PrivacyPolicy = () => {
  return (
    <div className="w-full bg-[#0B0B0B] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:text-[#F5E6B3] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="bg-[#171717] rounded-3xl p-8 sm:p-12 border border-[#3A321C] shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal & Privacy Statement</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] mb-6">
            Privacy Policy — INOVIQ GLOBAL PVT. LTD.
          </h1>

          <div className="text-xs text-[#888888] mb-8 pb-4 border-b border-[#3A321C]/60">
            Last Updated: October 2026 | Effective Date: Immediate
          </div>

          <div className="max-w-none text-xs sm:text-sm text-[#B5B5B5] space-y-6 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">1. Overview</h2>
              <p>
                This Privacy Policy describes how <strong className="text-white">INOVIQ GLOBAL PVT. LTD.</strong> ("we", "our", or "the Company"), registered in Sikar, Rajasthan, India, collects, processes, and protects the personal and business information you provide when using our website and digital inquiry systems.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">2. Information We Collect</h2>
              <p>When you submit a consultation request or quotation inquiry, we collect:</p>
              <ul className="list-disc pl-5 space-y-1 my-2 text-[#CCCCCC]">
                <li><strong className="text-white">Contact Identifiers:</strong> Your full name, email address, phone number, and company name.</li>
                <li><strong className="text-white">Project Requirements:</strong> Selected service category, specific deliverables, estimated budget range, timeline, and descriptive notes.</li>
                <li><strong className="text-white">Contact Preferences:</strong> Preferred communication mode (WhatsApp, telephone call, or email) and suitable times to reach you.</li>
                <li><strong className="text-white">Technical Logs:</strong> IP address, browser type, and timestamps to prevent malicious spam submissions and rate-limiting enforcement.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">3. Purpose of Processing</h2>
              <p>Your details are used exclusively for:</p>
              <ul className="list-disc pl-5 space-y-1 my-2 text-[#CCCCCC]">
                <li>Evaluating your project scope and preparing an accurate quotation.</li>
                <li>Assigning a dedicated unique reference number to track your service request.</li>
                <li>Direct business communication regarding your requested services.</li>
                <li>Compliance with applicable consumer protection and digital communications standards.</li>
              </ul>
              <p>We do not sell, rent, or lease customer contact information to third-party marketing brokers.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">4. Data Security & Storage</h2>
              <p>
                All customer inquiries are securely stored in protected MongoDB databases with encryption in transit and strict authorization controls. Access is restricted to authorized personnel who need to review project requirements.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">5. Your Rights & Data Deletion</h2>
              <p>
                You have the right to request a summary of the personal information we hold regarding your inquiries or request deletion of your records from our systems. To exercise these rights, please email us at <a href="mailto:info@inoviqglobal.com" className="text-[#D4AF37] underline hover:text-[#F5E6B3]">info@inoviqglobal.com</a> with your unique inquiry reference number.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white font-['Outfit'] mb-2">6. Contact Information</h2>
              <p>
                For any questions regarding our data practices, reach us at: <br />
                <strong className="text-white">INOVIQ GLOBAL PVT. LTD.</strong><br />
                2nd Floor, Bhawani Plaza,
Chandpol Gate, Sikar,
Rajasthan 332001<br />
                Email: info@inoviqglobal.com | Phone: +91 80001 80600
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
