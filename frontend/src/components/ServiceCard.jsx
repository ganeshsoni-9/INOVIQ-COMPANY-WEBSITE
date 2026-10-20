import React from 'react';
import { CheckCircle2, ArrowRight, Eye, Send, Sparkles } from 'lucide-react';

export const ServiceCard = ({
  service,
  onViewDetails,
  onEnquire,
  compact = false,
  isHome = true,
  dark = false,
}) => {
  return (
    <div className={`rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 group ${
      dark
        ? 'bg-[#171717] border-[#3A321C] hover:border-[#D4AF37]/60 shadow-lg'
        : 'bg-white border-slate-200/90 shadow-sm hover:shadow-xl'
    }`}>
      <div>
        {/* Card Image Header with Category Tag */}
        <div className={`relative h-44 sm:h-48 overflow-hidden flex items-center justify-center ${
          service.id === 'letterhead-design' ? 'bg-[#0f172a]' : 'bg-slate-900'
        }`}>
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full block ${
              service.id === 'letterhead-design'
                ? 'object-contain object-center'
                : 'object-cover group-hover:scale-105 transition-transform duration-500'
            } opacity-90 group-hover:opacity-100`}
            style={service.imageStyle}
            loading="lazy"
          />
          {service.id === 'letterhead-design' ? (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
          )}

          <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow ${
              isHome || dark
                ? 'bg-[#D4AF37] text-[#0B0B0B]'
                : 'bg-blue-600/90 backdrop-blur-md text-white'
            }`}>
              {service.categoryTitle}
            </span>
          </div>

          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px]">
            <span className="font-semibold text-slate-200">
              #{service.order} • Available
            </span>
            <span className="font-mono text-[10px] text-[#D4AF37]">inoviq</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6">
          <h3 className={`text-lg font-bold mb-2 font-['Outfit'] transition-colors leading-snug ${
            dark
              ? 'text-white group-hover:text-[#D4AF37]'
              : isHome
              ? 'text-slate-900 group-hover:text-[#D4AF37]'
              : 'text-slate-900 group-hover:text-blue-600'
          }`}>
            {service.title}
          </h3>

          <p className={`text-xs leading-relaxed mb-4 line-clamp-3 ${dark ? 'text-[#B5B5B5]' : 'text-slate-600'}`}>
            {service.shortDescription}
          </p>

          {/* Key Deliverables Bullet Points */}
          {service.includes && service.includes.length > 0 && (
            <div className={`space-y-1.5 pt-3 border-t mb-2 ${dark ? 'border-[#3A321C]/60 text-[#B5B5B5]' : 'border-slate-100 text-slate-600'}`}>
              {service.includes.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#D4AF37]" />
                  <span className="line-clamp-1">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className={`px-6 pb-6 pt-3 border-t flex items-center justify-between gap-2 ${dark ? 'border-[#3A321C]/60' : 'border-slate-100/80'}`}>
        <button
          onClick={() => onViewDetails(service)}
          className={`text-xs font-bold transition-colors flex items-center gap-1 group/btn py-2 ${
            dark
              ? 'text-[#B5B5B5] hover:text-[#D4AF37]'
              : isHome
              ? 'text-slate-700 hover:text-[#D4AF37]'
              : 'text-slate-700 hover:text-blue-600'
          }`}
        >
          <Eye className={`w-3.5 h-3.5 ${dark || isHome ? 'text-[#D4AF37]' : 'text-slate-400 group-hover/btn:text-blue-600'}`} />
          <span>View Details</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
        </button>

        <button
          onClick={() => onEnquire(service.categoryTitle, service.title)}
          className="px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 active:scale-95 text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37]"
        >
          <Send className="w-3 h-3" />
          <span>Enquire Now</span>
        </button>
      </div>
    </div>
  );
};
