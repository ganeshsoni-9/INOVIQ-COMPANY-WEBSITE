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
}) => {
  const IconComponent = iconMap[category.iconName] || Palette;

  return (
    <div
      onClick={() => onSelectCategory(category.id)}
      className={`relative bg-white rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1.5 ${
        isActive
          ? 'border-blue-600 shadow-xl ring-2 ring-blue-500/20'
          : 'border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-400'
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
            <span className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold block mb-0.5">
              inoviq Domain
            </span>
            <h3 className="text-xl font-extrabold text-white font-['Outfit'] leading-tight group-hover:text-cyan-200 transition-colors">
              {category.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {category.description}
          </p>

          {/* Highlights checklist */}
          {category.highlights && (
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              {category.highlights.slice(0, 3).map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-[11px] text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="line-clamp-1">{h}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explore Services Button Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-slate-100/80 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
          Browse Catalog
        </span>

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all ${
            isActive
              ? 'bg-blue-600 text-white shadow-md'
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
