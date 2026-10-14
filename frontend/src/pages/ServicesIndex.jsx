import React from 'react';
import { CategoryWiseServicesSection } from '../components/CategoryWiseServicesSection';

export const ServicesIndex = () => {
  return (
    <div className="w-full">
      {/* Services Directory Hero */}
      <section className="bg-gradient-to-b from-[#0A192F] via-[#0D2040] to-[#0A192F] text-white py-20 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-800/90 px-4 py-1.5 rounded-full border border-slate-700 shadow-sm inline-block mb-4">
            inoviq Integrated Directory
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-['Outfit'] tracking-tight">
            All 48+ Services Directory
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto mt-4 leading-relaxed">
            Explore our comprehensive suite of Graphic Design, Modern Web Development, Digital Services, Marketing Campaigns, and Legal Business Support solutions. Every service includes full details and direct quotation.
          </p>
        </div>
      </section>

      {/* Main Interactive Category-Wise Directory */}
      <CategoryWiseServicesSection
        initialCategoryId="all"
        showCategoryCards={true}
        title="Browse By Domain Or Search All Offerings"
        subtitle="Select a category card to open its dedicated listing, or explore all 48 individual cards with instant search, detailed deliverables, and online quotation."
      />
    </div>
  );
};
