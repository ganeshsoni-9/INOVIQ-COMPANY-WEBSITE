import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  Filter,
  ArrowRight,
  Layers,
  Sparkles,
  ArrowLeft,
  X,
  ExternalLink,
} from 'lucide-react';
import { CATEGORIES_DATA, SERVICES_DATA } from '../data/servicesData';
import { CategoryCard } from './CategoryCard';
import { ServiceCard } from './ServiceCard';
import { ServiceDetailModal } from './ServiceDetailModal';
import { InquiryModal } from './InquiryModal';

export const CategoryWiseServicesSection = ({
  initialCategoryId = 'all',
  showCategoryCards = true,
  title = 'inoviq Category-Wise Services Directory',
  subtitle = 'Every service category opens its own dedicated listing with individual cards and descriptions.',
}) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalService, setDetailModalService] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState({ category: 'Graphic Design', title: '' });

  // Filter services by category and search query
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        service.categoryId === selectedCategory ||
        service.categorySlug === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.categoryTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current active category object
  const activeCategoryObj = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return (
      CATEGORIES_DATA.find(
        (c) => c.id === selectedCategory || c.slug === selectedCategory
      ) || null
    );
  }, [selectedCategory]);

  const handleOpenDetails = (service) => {
    setDetailModalService(service);
  };

  const handleCloseDetails = () => {
    setDetailModalService(null);
  };

  const handleOpenInquiry = (category, title) => {
    setInquiryService({ category, title });
    setInquiryModalOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryModalOpen(false);
  };

  return (
    <section id="services-directory" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className={`text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border inline-flex items-center gap-1.5 shadow-sm ${
            isHome
              ? 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#3A321C]'
              : 'text-blue-600 bg-blue-50 border-blue-200/60'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isHome ? 'text-[#D4AF37]' : 'text-blue-600'}`} />
            <span>inoviq Integrated Capabilities</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-4 font-['Outfit'] tracking-tight">
            {title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* 5 Main Category Cards Grid (Prominently displayed) */}
        {showCategoryCards && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit']">
                Five Specialized Domains
              </h3>
              <span className="text-xs font-semibold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                Click any domain to explore
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES_DATA.map((cat, idx) => (
                <div
                  key={cat.id}
                  className={idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
                >
                  <CategoryCard
                    category={cat}
                    isActive={selectedCategory === cat.id}
                    isHome={isHome}
                    onSelectCategory={(id) => {
                      setSelectedCategory(id);
                      // Smooth scroll down to service list
                      const el = document.getElementById('category-services-listing');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Navigation Bar & Search Filters */}
        <div id="category-services-listing" className="pt-4 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Category Pills Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedCategory === 'all'
                      ? isHome
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] font-bold shadow-md'
                        : 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Services (48)
                </button>

                {CATEGORIES_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? isHome
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] font-bold shadow-md'
                          : 'bg-blue-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.title} ({cat.count})
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative w-full lg:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search 48 services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                    isHome
                      ? 'focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]'
                      : 'focus:ring-2 focus:ring-blue-500'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Active Category Header Banner if single category chosen */}
            {activeCategoryObj && (
              <div className={`mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl ${
                isHome ? 'bg-[#D4AF37]/10 border border-[#3A321C]/40' : 'bg-blue-50/40'
              }`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isHome ? 'text-[#D4AF37] bg-[#D4AF37]/20' : 'text-blue-600 bg-blue-100'
                    }`}>
                      Selected Category
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {activeCategoryObj.count} Individual Services
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                    {activeCategoryObj.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                    {activeCategoryObj.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to All</span>
                  </button>

                  <Link
                    to={activeCategoryObj.path}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm ${
                      isHome
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] text-[#0B0B0B]'
                        : 'text-white bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    <span>Dedicated Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800 font-['Outfit']">
              {selectedCategory === 'all'
                ? 'All inoviq Offerings'
                : activeCategoryObj?.title}
            </span>
            <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
              {filteredServices.length} Cards
            </span>
          </div>

          {searchQuery && (
            <span className="text-xs text-slate-500">
              Matching "{searchQuery}"
            </span>
          )}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-slate-800 mb-1 font-['Outfit']">
              No matching services found
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              We couldn't find any services matching "{searchQuery}". Try searching for terms like "Logo", "Website", "Instagram", "WhatsApp", or "Trademark".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm ${
                isHome
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] text-[#0B0B0B]'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          /* Responsive 3-Column Services Grid (Desktop: 3, Tablet: 2, Mobile: 1) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isHome={isHome}
                onViewDetails={handleOpenDetails}
                onEnquire={handleOpenInquiry}
              />
            ))}
          </div>
        )}

        {/* Bottom Direct Inquiry Banner */}
        <div className={`mt-16 p-8 sm:p-10 rounded-3xl text-white border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
          isHome
            ? 'bg-gradient-to-r from-[#0B0B0B] via-[#171717] to-[#0B0B0B] border-[#3A321C]'
            : 'bg-gradient-to-r from-[#0A192F] via-[#0E274D] to-[#0A192F] border-slate-700'
        }`}>
          <div className="space-y-2 text-center md:text-left">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              isHome
                ? 'text-[#D4AF37] bg-[#171717] border-[#3A321C]'
                : 'text-cyan-400 bg-slate-800/80 border-slate-700'
            }`}>
              Custom Requirements
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Need a Custom Package Across Multiple Categories?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Combine Graphic Branding, Dynamic Web Development, Digital Marketing, and Business Setup into one coordinated commercial agreement.
            </p>
          </div>

          <button
            onClick={() => handleOpenInquiry('General Inquiry', 'Multi-Category Custom Package')}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shrink-0 flex items-center gap-2 active:scale-95 ${
              isHome
                ? 'text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] hover:shadow-[#D4AF37]/25'
                : 'text-slate-900 bg-cyan-400 hover:bg-cyan-300 hover:shadow-cyan-400/25'
            }`}
          >
            <span>Request Custom Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={detailModalService}
        isOpen={Boolean(detailModalService)}
        onClose={handleCloseDetails}
        onEnquire={handleOpenInquiry}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={handleCloseInquiry}
        category={inquiryService.category}
        serviceTitle={inquiryService.title}
      />
    </section>
  );
};
