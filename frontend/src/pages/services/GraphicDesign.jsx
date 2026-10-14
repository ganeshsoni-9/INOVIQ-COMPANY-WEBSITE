import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  ArrowLeft,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceDetailModal } from '../../components/ServiceDetailModal';
import { InquiryModal } from '../../components/InquiryModal';
import { InquiryForm } from '../../components/InquiryForm';

export const GraphicDesign = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [detailModalService, setDetailModalService] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

  // All 20 graphic services from master dataset
  const graphicServices = SERVICES_DATA.filter(
    (s) => s.categoryId === 'graphic-services' || s.categorySlug === 'graphic-design'
  );

  const filteredServices = graphicServices.filter((s) =>
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
      <section className="bg-gradient-to-b from-[#0A192F] via-[#121B35] to-[#0A192F] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full border border-white/10 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Palette className="w-4 h-4" />
              <span>Category • 20 Design Offerings</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight leading-tight mb-4 text-white">
              Graphic Services
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Creative visual design solutions that help businesses build a distinctive, consistent, and professional brand identity.
            </p>

            {/* Quick Search */}
            <div className="max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search across 20 graphic services..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-purple-400 transition-all backdrop-blur-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Responsive: 3 on Desktop, 2 on Tablet, 1 on Mobile) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                All 20 Graphic Services
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Every service has its own dedicated card, deliverables breakdown, and instant quotation.
              </p>
            </div>

            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200 self-start sm:self-auto">
              Showing {filteredServices.length} of {graphicServices.length} Services
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <p className="text-slate-500 text-sm mb-3">
                No graphic services found matching "{filterQuery}".
              </p>
              <button
                onClick={() => setFilterQuery('')}
                className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors"
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
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Start Your Design Project
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Request A Graphic Design Quotation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Fill out your brand requirements below. Our creative team will review your specifications and respond within 24 hours.
            </p>
          </div>

          <InquiryForm initialCategory="Graphic Design" />
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
        category="Graphic Design"
        serviceTitle={selectedServiceTitle}
      />
    </div>
  );
};
