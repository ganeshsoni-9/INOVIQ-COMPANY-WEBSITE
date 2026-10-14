import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';
import {
  fetchSiteSettings,
  updateAdminSettings,
} from '../../services/api';

export const AdminSettings = () => {
  const [settings, setSettings] = useState({
    companyName: 'INOVIQ GLOBAL PVT. LTD.',
    tagline:
      'Ideas Into Impact. Digital Solutions That Grow Your Business.',
    companyEmail: 'info@inoviqglobal.com',
    inquiryEmail: 'inquiries@INOVIQglobal.com',
    companyPhone: '+91 80001 80600',
    whatsappNumber: '+919876543210',
    address:
      '2nd Floor, Bhawani Plaza, Chandpol Gate, Sikar, Rajasthan 332001',
    officeHours: 'Monday – Saturday: 9:30 AM – 7:00 PM IST',
    announcementBar: {
      enabled: true,
      text: '🚀 Accelerate your business growth with INOVIQ GLOBAL — Web, Branding, Digital Marketing & Legal Solutions.',
      ctaText: 'Get a Quote',
      ctaLink: '/get-a-quote',
    },
    socialLinks: {
      facebook: 'https://facebook.com/INOVIQglobal',
      instagram: 'https://instagram.com/INOVIQglobal',
      linkedin: 'https://linkedin.com/company/INOVIQglobal',
    },
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;

    const loadSettings = async () => {
      try {
        const res = await fetchSiteSettings();

        if (active && res?.data) {
          const data = res.data;

          setSettings((prev) => ({
            ...prev,
            ...data,
            announcementBar: {
              ...prev.announcementBar,
              ...(data.announcementBar || {}),
            },
            socialLinks: {
              ...prev.socialLinks,
              ...(data.socialLinks || {}),
            },
          }));
        }
      } catch (err) {
        console.warn('Settings load error:', err.message);
        if (active) {
          setErrorMsg('Unable to load settings. Please refresh the page.');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnnouncementChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,
      announcementBar: {
        ...prev.announcementBar,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await updateAdminSettings(settings);

      if (res?.success) {
        setSuccessMsg('Site settings updated successfully.');
      } else {
        setErrorMsg(
          res?.message || 'Settings could not be updated.'
        );
      }
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message ||
          err.message ||
          'Error updating settings.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p className="text-xs">Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Site Settings & Company Profile
        </h2>

        <p className="text-xs sm:text-sm text-slate-500">
          Configure contact details, address, notification emails,
          social links, and header announcement bar.
        </p>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div
          role="alert"
          className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold"
        >
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
            Company Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company Legal Name
              </label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={settings.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Official Email
              </label>
              <input
                type="email"
                name="companyEmail"
                value={settings.companyEmail}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Inquiry Email
              </label>
              <input
                type="email"
                name="inquiryEmail"
                value={settings.inquiryEmail}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Telephone Hotline
              </label>
              <input
                type="tel"
                name="companyPhone"
                value={settings.companyPhone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Business Number
              </label>
              <input
                type="tel"
                name="whatsappNumber"
                value={settings.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Office Hours
              </label>
              <input
                type="text"
                name="officeHours"
                value={settings.officeHours}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Registered Physical Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={settings.address}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
            Social Media Links
          </h3>

          {Object.entries(settings.socialLinks).map(([platform, url]) => (
            <div key={platform}>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {platform}
              </label>
              <input
                type="url"
                name={platform}
                value={url}
                onChange={handleSocialChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Announcement Bar */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
            Top Announcement Bar
          </h3>

          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="annCheck"
                name="enabled"
                checked={Boolean(settings.announcementBar?.enabled)}
                onChange={handleAnnouncementChange}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="annCheck"
                className="font-semibold text-slate-800 cursor-pointer"
              >
                Display announcement strip on public pages
              </label>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Announcement Message
              </label>
              <input
                type="text"
                name="text"
                value={settings.announcementBar?.text || ''}
                onChange={handleAnnouncementChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Button Text
                </label>
                <input
                  type="text"
                  name="ctaText"
                  value={settings.announcementBar?.ctaText || ''}
                  onChange={handleAnnouncementChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  CTA Link
                </label>
                <input
                  type="text"
                  name="ctaLink"
                  value={settings.announcementBar?.ctaLink || ''}
                  onChange={handleAnnouncementChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Updating...' : 'Save All Settings'}</span>
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
