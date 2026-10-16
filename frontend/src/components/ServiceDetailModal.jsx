import React from 'react';
import {
  X,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Send,
  Layers,
} from 'lucide-react';

export const ServiceDetailModal = ({
  service,
  isOpen,
  onClose,
  onEnquire,
}) => {
  if (!isOpen || !service) return null;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello inoviq / INOVIQ Global, I am interested in your service: "${service.title}" (${service.categoryTitle}). Please provide more details.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#171717] rounded-3xl shadow-2xl border border-[#3A321C] overflow-hidden my-8 max-h-[92vh] flex flex-col text-white">
        {/* Modal Header Bar with Close Button */}
        <div className="sticky top-0 z-20 bg-[#171717]/95 backdrop-blur-sm px-6 py-4 border-b border-[#3A321C] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#3A321C]">
              {service.categoryTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#111111] hover:bg-[#222222] text-slate-300 hover:text-white border border-[#3A321C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Cover Image & Title Hero */}
          <div className="relative rounded-2xl overflow-hidden border border-[#3A321C] shadow-sm bg-slate-900 h-56 sm:h-72">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
              <span className="text-[#D4AF37] text-xs font-semibold tracking-wider uppercase mb-1">
                inoviq Service Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] leading-tight">
                {service.title}
              </h2>
            </div>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              Service Overview
            </h3>
            <p className="text-[#B5B5B5] text-sm sm:text-base leading-relaxed">
              {service.fullDescription || service.shortDescription}
            </p>
          </div>

          {/* Deliverables / What is Included */}
          {service.includes && service.includes.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#3A321C]">
              <h4 className="text-sm font-bold text-white mb-3 font-['Outfit'] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>What This Service Includes</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.includes.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#B5B5B5]">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Benefits to Customer */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="p-6 rounded-2xl bg-[#111111] border border-[#3A321C]">
              <h4 className="text-sm font-bold text-white mb-3 font-['Outfit'] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Key Commercial Benefits</span>
              </h4>
              <div className="space-y-2">
                {service.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#B5B5B5]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 shrink-0"></span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer for legal/ad services if applicable */}
          {service.categorySlug === 'legal-business-support' && (
            <div className="p-3.5 rounded-xl bg-[#111111] border border-amber-900/60 text-[11px] text-amber-200/90 leading-relaxed">
              ℹ️ <strong>Administrative Notice:</strong> Corporate registration and trademark search services provide administrative facilitation and documentation assistance coordinated with certified practicing professionals.
            </div>
          )}
        </div>

        {/* Modal Action Footer */}
        <div className="sticky bottom-0 z-20 bg-[#111111] px-6 py-4 border-t border-[#3A321C] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#171717] transition-colors"
          >
            ← Back to Services
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleWhatsApp}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-950/60 border border-emerald-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Chat</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onEnquire(service.categoryTitle, service.title);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold text-[#0B0B0B] bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#C9A227] hover:to-[#B38F20] transition-all shadow-md hover:shadow-lg hover:shadow-[#D4AF37]/25 flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire About This Service</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
