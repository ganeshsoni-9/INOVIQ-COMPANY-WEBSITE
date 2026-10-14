import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

export const TermsConditions = () => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          <FileText className="w-4 h-4" />
          <span>Terms of Business Engagement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit'] mb-6">
          Terms & Conditions — INOVIQ GLOBAL PVT. LTD.
        </h1>

        <div className="text-xs text-slate-500 mb-8 pb-4 border-b border-slate-200">
          Last Updated: October 2026 | Effective Date: Immediate
        </div>

        <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 space-y-6 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing the website of <strong>INOVIQ GLOBAL PVT. LTD.</strong> or submitting an inquiry for graphic design, web development, digital services, marketing, or business support, you acknowledge and agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">2. Scope of Services & Milestone Execution</h2>
            <p>
              All deliverables, timelines, milestones, and commercial fees will be documented in a formalized Statement of Work (SOW) or invoice. Work commences following initial milestone approval and confirmation of project specifications.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">3. Intellectual Property Rights</h2>
            <p>
              Upon complete settlement of agreed project dues, all final delivered graphical assets (logos, stationery, videos, packaging artwork) and custom application code developed exclusively for your assignment are transferred to the client. INOVIQ GLOBAL retains the right to display non-confidential project visuals within its digital portfolio and marketing materials unless a specific NDA is executed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">4. Disclaimer on Administrative & Legal Support</h2>
            <p>
              INOVIQ GLOBAL PVT. LTD. provides technical configuration and administrative documentation support for trademark search preparation, company incorporation documents, and merchant payment gateways. <strong>We are an independent digital services firm and not a law firm.</strong> We do not provide regulated legal representation or guarantee statutory approvals from governmental or regulatory bodies. Formal filings are conducted through qualified independent professionals.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">5. Marketing & Audience Growth Policies</h2>
            <p>
              We implement ethical, organic social media and paid advertising strategies. We do not sell or deliver bot accounts, artificial engagement, or promise fixed Google search positions. Actual advertising results and customer conversions are influenced by client market demand, product pricing, and competitive factors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">6. Jurisdiction</h2>
            <p>
              Any disputes arising out of or related to our services shall be subject to the exclusive jurisdiction of the competent courts in Sikar, Rajasthan, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
