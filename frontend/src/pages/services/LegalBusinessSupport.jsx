import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { SERVICES_DATA } from '../../data/servicesData';
import { ServiceCard } from '../../components/ServiceCard';
import { ServiceDetailModal } from '../../components/ServiceDetailModal';
import { InquiryModal } from '../../components/InquiryModal';
import { InquiryForm } from '../../components/InquiryForm';

export const LegalBusinessSupport = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [detailModalService, setDetailModalService] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState('');

  // All 5 legal & business setup services
  const legalServices = SERVICES_DATA.filter(
    (s) => s.categoryId === 'legal-services' || s.categorySlug === 'legal-business-support'
  );

  const filteredServices = legalServices.filter((s) =>
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
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0E2822] to-[#0A192F] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>

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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Category • 5 Legal & Business Infrastructure Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-['Outfit'] tracking-tight leading-tight mb-4 text-white">
              Legal Services
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Business registration assistance and essential digital business solutions to help companies establish their business identity and infrastructure.
            </p>

            {/* Regulatory Notice Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed mb-8 flex items-start gap-2.5 max-w-2xl">
              <AlertCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>
                <strong>Administrative Facilitation Notice:</strong> Business registration and trademark search services provide administrative paperwork coordination through qualified practicing legal professionals. We do not act as an independent law firm.
              </span>
            </div>

            {/* Quick Search */}
            <div className="max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search across 5 legal & business services..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-slate-700 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:bg-white/15 focus:ring-2 focus:ring-emerald-400 transition-all backdrop-blur-md"
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
                All 5 Legal & Business Infrastructure Services
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Trademark search support, company incorporation aid, payment gateways, enterprise WhatsApp API, and domain routing.
              </p>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
              Showing {filteredServices.length} of {legalServices.length} Services
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <p className="text-slate-500 text-sm mb-3">
                No legal services found matching "{filterQuery}".
              </p>
              <button
                onClick={() => setFilterQuery('')}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
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
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Establish Your Business Infrastructure
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 font-['Outfit']">
              Request A Legal & Infrastructure Consultation
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Tell us about your brand name, company structure, or digital payment needs. Our team will guide your onboarding process.
            </p>
          </div>

          <InquiryForm initialCategory="Legal & Business Support" />
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
        category="Legal & Business Support"
        serviceTitle={selectedServiceTitle}
      />
    </div>
  );
};
