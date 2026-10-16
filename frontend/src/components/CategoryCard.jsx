import React from 'react';
import {
  Palette,
  Code,
  Share2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const iconMap = {
  Palette,
  Code,
  Share2,
  TrendingUp,
  ShieldCheck,
};

export const CategoryCard = ({
  category,
  onSelectCategory,
  isActive = false,
  isHome = true,
  dark = false,
}) => {
  const IconComponent = iconMap[category.iconName] || Palette;

  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 ${
        dark
          ? `bg-[#171717] ${
              isActive
                ? 'border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20'
                : 'border-[#3A321C] shadow-md hover:shadow-xl hover:border-[#D4AF37]'
            }`
          : `bg-white ${
              isActive
                ? isHome
                  ? 'border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/20'
                  : 'border-blue-600 shadow-xl ring-2 ring-blue-500/20'
                : isHome
                ? 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-[#D4AF37]'
                : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-400'
            }`
      }`}
    >
      <div>
        {/* Cover Image & Category Badge */}
        <div className="relative h-48 overflow-hidden bg-slate-900">
          <img
            src={category.coverImage}
            alt={category.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-95"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>

          {/* Floating Category Icon */}
          <div className="absolute top-4 left-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${category.accentColor} text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
          </div>

          {/* Service Count Badge */}
          <div className="absolute top-4 right-4">
            <span className="text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow">
              {category.count} Services
            </span>
          </div>

          {/* Bottom Title on Image */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className={`text-[10px] uppercase tracking-wider font-bold block mb-0.5 ${isHome ? 'text-[#D4AF37]' : 'text-cyan-300'}`}>
              inoviq Domain
            </span>
            <h3 className={`text-xl font-extrabold text-white font-['Outfit'] leading-tight transition-colors ${isHome ? 'group-hover:text-[#F5E6B3]' : 'group-hover:text-cyan-200'}`}>
              {category.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className={`text-xs leading-relaxed mb-4 ${dark ? 'text-[#B5B5B5]' : 'text-slate-600'}`}>
            {category.description}
          </p>

          {/* Highlights checklist */}
          {category.highlights && (
            <div className={`space-y-1.5 pt-3 border-t ${dark ? 'border-[#3A321C]/60' : 'border-slate-100'}`}>
              {category.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className={`flex items-center gap-2 text-[11px] ${dark ? 'text-[#CCCCCC]' : 'text-slate-700'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#D4AF37]" />
                  <span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explore Services Button Footer */}
      <div className={`px-6 pb-6 pt-2 border-t flex items-center justify-between ${dark ? 'border-[#3A321C]/60' : 'border-slate-100/80'}`}>
        <span className={`text-xs font-semibold transition-colors ${dark ? 'text-[#888888] group-hover:text-[#D4AF37]' : isHome ? 'text-slate-400 group-hover:text-[#D4AF37]' : 'text-slate-400 group-hover:text-blue-600'}`}>
          Browse Catalog
        </span>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
            isActive
              ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] shadow-md'
              : dark
              ? 'bg-[#111111] text-[#D4AF37] border border-[#3A321C] group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#C9A227] group-hover:text-[#0B0B0B]'
              : isHome
              ? 'bg-slate-100 text-slate-700 group-hover:bg-gradient-to-r group-hover:from-[#D4AF37] group-hover:to-[#C9A227] group-hover:text-[#0B0B0B]'
              : 'bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white'
          }`}
        >
          <span>Explore Services</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  );
};
