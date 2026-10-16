import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Code,
  ArrowLeft,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceDetailModal } from '../../components/ServiceDetailModal';
import { InquiryModal } from '../../components/InquiryModal';
import { InquiryForm } from '../../components/InquiryForm';

export const WebDevelopment = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [detailModalService, setDetailModalService] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

  // All 7 web development services
  const webServices = SERVICES_DATA.filter(
    (s) => s.categoryId === 'web-development-services' || s.categorySlug === 'web-development'
  );

  const filteredServices = webServices.filter((s) =>
    s.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.shortDescription.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleOpenDetails = (service) => {
    setDetailModalService(service);
  };

  const handleOpenInquiry = (category, title) => {
    setSelectedServiceTitle(title);
    setInquiryModalOpen(true);
  };

  return (
    <div className="w-full">
      {/* Category Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#C9A227]/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#F5E6B3] bg-[#171717] hover:bg-[#222222] px-3.5 py-1.5 rounded-full border border-[#3A321C] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171717] border border-[#3A321C] text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Code className="w-4 h-4" />
              <span>Category • 7 Full-Stack Web Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight leading-tight mb-4 text-white">
              Web Development Services
            </h1>

            <p className="text-[#B5B5B5] text-base sm:text-lg leading-relaxed mb-8">
              Modern web solutions designed to help businesses establish their online presence, reach customers, and deliver better digital experiences.
            </p>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Sub-Second Speeds'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-[#171717] border border-[#3A321C] text-xs font-mono text-[#D4AF37]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Quick Search */}
            <div className="max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search across 7 web services..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#171717] border border-[#3A321C] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:bg-[#111111] focus:ring-2 focus:ring-[#D4AF37] transition-all backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Responsive: 3 on Desktop, 2 on Tablet, 1 on Mobile) */}
      <section className="py-20 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-[#3A321C]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                All 7 Web Development Services
              </h2>
              <p className="text-xs text-[#B5B5B5] mt-1">
                Custom full-stack architecture, e-commerce, digital business cards, and conversational AI chatbots.
              </p>
            </div>

            <span className="text-xs font-bold text-[#D4AF37] bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C] self-start sm:self-auto">
              Showing {filteredServices.length} of {webServices.length} Services
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-[#171717] rounded-3xl border border-[#3A321C] p-8 shadow-sm">
              <p className="text-[#B5B5B5] text-sm mb-3">
                No web services found matching "{filterQuery}".
              </p>
              <button
                onClick={() => setFilterQuery('')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] text-xs font-bold hover:from-[#C9A227] hover:to-[#B38F20] transition-colors"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onViewDetails={handleOpenDetails}
                  onEnquire={handleOpenInquiry}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Embedded Direct Quotation Section */}
      <section className="py-20 bg-[#0B0B0B] border-t border-[#3A321C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
              Start Your Web Project
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3 font-['Outfit']">
              Request A Web Development Quotation
            </h2>
            <p className="text-xs sm:text-sm text-[#B5B5B5] mt-2">
              Share your project scope, features, and timeline below. Our engineering leads will review your tech stack and provide an estimate.
            </p>
          </div>

          <InquiryForm initialCategory="Web Development" />
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailModalService}
        isOpen={Boolean(detailModalService)}
        onClose={() => setDetailModalService(null)}
        onEnquire={handleOpenInquiry}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        category="Web Development"
        serviceTitle={selectedServiceTitle}
      />
    </div>
  );
};
