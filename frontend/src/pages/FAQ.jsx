import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

export const FAQ = () => {
  const [activeIdx, setActiveIdx] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const faqData = [
    {
      category: 'General',
      q: 'Who is INOVIQ GLOBAL PVT. LTD.?',
      a: 'INOVIQ GLOBAL PVT. LTD. is an integrated digital services and business solutions company based in Sikar, Rajasthan, serving businesses across India and globally. We bridge creative brand design, modern MERN web software, organic digital visibility, targeted marketing campaigns, and essential business support.',
    },
    {
      category: 'General',
      q: 'How can I discuss my project requirements or request pricing?',
      a: 'You can submit an inquiry through our Get a Quote page, click Enquire Now on any specific service card, or message our corporate desk directly on WhatsApp. We generate an instant tracking reference number and reach out within 24 business hours.',
    },
    {
      category: 'Graphic Design',
      q: 'What formats will I receive for logo and branding deliverables?',
      a: 'All graphic design deliverables include full commercial copyright transfer along with print-ready CMYK and digital RGB formats: Adobe Illustrator vector source (.AI), Scalable Vector Graphics (.SVG), high-res transparent PNGs, print-ready PDF, and EPS files.',
    },
    {
      category: 'Graphic Design',
      q: 'What is the turnaround time for a 3D product render or promotional video?',
      a: 'Logo concepts and stationery designs typically take 3 to 5 business days. Photorealistic 3D product renders and commercial promotional videos take approximately 5 to 10 business days depending on model complexity and revision cycles.',
    },
    {
      category: 'Web Development',
      q: 'What technologies do you use for website development?',
      a: 'We specialize in the modern MERN stack (MongoDB, Express.js, React.js, and Node.js) paired with Tailwind CSS and performance-optimized APIs. This delivers sub-second page loads, mobile responsiveness, bank-grade data security, and seamless dynamic CMS administration.',
    },
    {
      category: 'Web Development',
      q: 'Will my website work cleanly on mobile phones and tablets?',
      a: 'Yes, 100%. Every web portal we engineer undergoes cross-browser and multi-resolution responsive testing across iOS, Android, tablets, laptops, and ultra-wide desktop monitors with zero horizontal overflow.',
    },
    {
      category: 'Marketing',
      q: 'Do you guarantee a specific number of followers or sales?',
      a: 'No. INOVIQ GLOBAL operates on honesty and compliance. We do not use fake bots, click farms, or artificial vanity followers. We implement proven organic content strategies and targeted paid ad funnels designed to connect you with genuine potential customers.',
    },
    {
      category: 'Marketing',
      q: 'Are your bulk WhatsApp and SMS marketing services compliant?',
      a: 'Yes. All messaging broadcasts are subject to opt-in consent, TRAI/DLT registration norms, and Meta Business API anti-spam guidelines to safeguard sender domain reputation.',
    },
    {
      category: 'Legal & Business',
      q: 'Are your legal services a substitute for a licensed law firm?',
      a: 'No. INOVIQ GLOBAL PVT. LTD. provides administrative assistance, technical configuration, and documentation facilitation. We are not a law firm. Formal trademark filings and company incorporation are handled in coordination with practicing professionals.',
    },
    {
      category: 'Legal & Business',
      q: 'How does WhatsApp Business API onboarding work?',
      a: 'We help you prepare the required business verification documents for Meta Business Manager, configure official message templates, and link the Cloud API with your web portal or support desk.',
    },
  ];

  const categories = ['All', 'General', 'Graphic Design', 'Web Development', 'Marketing', 'Legal & Business'];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full bg-[#0B0B0B]">
      {/* Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 relative overflow-hidden border-b border-[#3A321C]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
            Knowledge Base
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Frequently Asked Questions
          </h1>
          <p className="text-[#B5B5B5] text-sm sm:text-base max-w-xl mx-auto mt-3">
            Find immediate answers regarding our project workflows, deliverable formats, technology stack, and business policies.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="w-5 h-5 text-[#D4AF37] absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search queries (e.g. Turnaround, MERN, Formats)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#171717] border border-[#3A321C] text-white placeholder-[#777777] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === c
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] font-bold shadow-md shadow-[#D4AF37]/10'
                    : 'bg-[#171717] text-[#B5B5B5] hover:text-white hover:bg-[#1f1f1f] border border-[#3A321C]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#171717] rounded-2xl border border-[#3A321C] overflow-hidden shadow-sm transition-all hover:border-[#D4AF37]/50"
                >
                  <button
                    onClick={() => setActiveIdx(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-['Outfit']">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-[#888888]'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-[#B5B5B5] text-xs sm:text-sm leading-relaxed border-t border-[#3A321C]/60 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Box */}
          <div className="mt-14 p-8 rounded-3xl bg-[#171717] border border-[#3A321C] text-center shadow-lg">
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
              Still have a query not covered here?
            </h3>
            <p className="text-xs sm:text-sm text-[#B5B5B5] max-w-md mx-auto mb-6">
              Our customer advisory team is available to discuss your custom project scope via phone, WhatsApp, or email.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] text-xs font-bold transition-all shadow-md shadow-[#D4AF37]/10"
              >
                Contact Our Support Desk
              </Link>
              <Link
                to="/get-a-quote"
                className="px-6 py-3 rounded-xl bg-[#111111] text-[#E0E0E0] border border-[#3A321C] hover:border-[#D4AF37] hover:text-[#D4AF37] text-xs font-semibold transition-colors"
              >
                Request Quotation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
