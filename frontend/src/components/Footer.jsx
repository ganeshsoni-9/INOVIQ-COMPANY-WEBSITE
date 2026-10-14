import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Shield,
  Lock,
} from 'lucide-react';
import { Logo } from './Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              Ideas Into Impact. INOVIQ GLOBAL PVT. LTD. is a premier digital services and business solutions company. We help enterprises, local businesses, and startups transform their creative identity, web infrastructure, and market reach.
            </p>
            <div className="pt-2 space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>2nd Floor, Bhawani Plaza,
Chandpol Gate, Sikar,
Rajasthan 332001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 80001 80600
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:info@inoviqglobal.com" className="hover:text-white transition-colors">
                  info@inoviqglobal.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon – Sat: 9:30 AM – 7:00 PM IST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Service Domains */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-['Outfit']">
              Service Domains
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  to="/services/graphic-design"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Graphic Design</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services/web-development"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Web Development</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services/digital-services"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Digital Services</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services/marketing"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Marketing Services</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services/legal-business-support"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Legal & Business Support</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold pt-1 inline-block"
                >
                  Browse All 48+ Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4 font-['Outfit']">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About INOVIQ Global
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-white transition-colors">
                  Our Work & Case Studies
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Support & Sales
                </Link>
              </li>
              <li>
                <Link to="/get-a-quote" className="hover:text-white transition-colors">
                  Request Custom Quotation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Conversion Box */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-2">
                <Shield className="w-4 h-4" />
                <span>Enterprise Quality</span>
              </div>
              <h5 className="text-white font-bold text-sm mb-1.5 font-['Outfit']">
                Ready to elevate your digital presence?
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Schedule a consultation with our strategy and development leads.
              </p>
            </div>
            <Link
              to="/get-a-quote"
              className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md block"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>

        {/* Legal Disclaimer Box (Crucial for compliance) */}
        <div className="py-4 my-6 px-5 rounded-xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
          <strong className="text-slate-300">Regulatory & Administrative Notice:</strong> INOVIQ GLOBAL PVT. LTD. provides administrative assistance, technical configuration, and documentation coordination for trademarks, entity formation, digital payment systems, and official WhatsApp Business API onboarding. We are an independent digital and business solutions company, not a law firm. Formal statutory, legal, and chartered accounting filings are facilitated in collaboration with duly licensed practicing professionals where required. We do not promise guaranteed followers, search rankings, or statutory approvals.
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {currentYear} INOVIQ GLOBAL PVT. LTD. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
