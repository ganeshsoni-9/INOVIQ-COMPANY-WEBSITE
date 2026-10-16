import React from 'react';
import { X } from 'lucide-react';
import { InquiryForm } from './InquiryForm';

export const InquiryModal = ({ isOpen, onClose, category = 'Graphic Design', serviceTitle = '' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#171717] rounded-3xl shadow-2xl border border-[#3A321C] overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-[#111111] hover:bg-[#222222] text-slate-300 hover:text-white border border-[#3A321C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Form */}
        <div className="p-1 sm:p-2 max-h-[90vh] overflow-y-auto">
          <InquiryForm
            initialCategory={category}
            initialService={serviceTitle}
            compact={true}
          />
        </div>
      </div>
    </div>
  );
};
