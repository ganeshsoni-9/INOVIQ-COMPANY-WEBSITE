import React, { useState, useEffect } from 'react';
import { ArrowUp, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FloatingActions = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const phoneNumber = '918000180600';
  const email = 'info@inoviqglobal.com';

  const whatsappMessage =
    'Hello INOVIQ GLOBAL, I would like to inquire about your digital services.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const socialButtons = [
    {
      name: 'WhatsApp',
      href: whatsappUrl,
      color: 'bg-[#25D366] hover:bg-[#20BA5A]',
      label: 'Chat on WhatsApp',
      external: true,
      icon: (
        <svg
          viewBox="0 0 32 32"
          className="w-8 h-8"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.6l6.35-1.66A12.7 12.7 0 1 0 16 3.2Zm0 23.1c-1.96 0-3.87-.53-5.55-1.53l-.4-.24-3.77.99 1.01-3.67-.26-.42A10.4 10.4 0 1 1 16 26.3Zm5.7-7.8c-.31-.16-1.84-.91-2.13-1.01-.29-.11-.49-.16-.7.16-.21.31-.8 1.01-.98 1.22-.18.21-.36.24-.67.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.21-.31.31-.52.11-.21.06-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.59s1.12 3.01 1.28 3.22c.16.21 2.2 3.36 5.33 4.71.74.32 1.32.51 1.77.65.74.24 1.41.2 1.94.12.59-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48-.08-.13-.29-.21-.6-.37Z" />
        </svg>
      ),
    },

    {
      name: 'Instagram',
      href: 'https://www.instagram.com/inoviqglobal/',
      color:
        'bg-gradient-to-tr from-[#FFB800] via-[#F00075] to-[#833AB4]',
      label: 'Follow on Instagram',
      external: true,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      ),
    },

    {
      name: 'Phone',
      href: `tel:+${phoneNumber}`,
      color: 'bg-[#2563EB] hover:bg-[#1D4ED8]',
      label: 'Call INOVIQ GLOBAL',
      external: false,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
        </svg>
      ),
    },

    {
      name: 'Email',
      href: `mailto:${email}`,
      color: 'bg-[#EA4335] hover:bg-[#C5221F]',
      label: 'Email INOVIQ GLOBAL',
      external: false,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
          className="pointer-events-auto p-3 rounded-full bg-white text-slate-700 hover:text-blue-600 shadow-lg border border-slate-200 transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Get Instant Quote */}
      <Link
        to="/get-a-quote"
        className="pointer-events-auto hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm px-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border border-white/20"
      >
        <Send className="w-4 h-4" />
        <span>Get Instant Quote</span>
      </Link>

      {/* WhatsApp, Instagram, Phone & Email */}
      {socialButtons.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={
            item.external ? 'noopener noreferrer' : undefined
          }
          aria-label={item.label}
          title={item.label}
          className={`pointer-events-auto group relative flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-slate-300 ${item.color}`}
        >
          {item.icon}

          <span className="absolute right-16 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
            {item.label}
          </span>
        </a>
      ))}

    </div>
  );
};

export default FloatingActions;