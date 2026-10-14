import React, { useState } from 'react';
import {
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  Send,
  Building,
  User,
  Mail,
  Phone,
  Calendar,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { submitInquiry } from '../services/api';

export const InquiryForm = ({
  initialCategory = 'Graphic Design',
  initialService = '',
  onSuccessCallback = null,
  compact = false,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceCategory: initialCategory,
    specificService: initialService,
    projectDescription: '',
    estimatedBudget: 'Flexible / Not Decided',
    expectedTimeline: 'Flexible',
    preferredContactMethod: 'whatsapp',
    bestTimeToContact: 'Anytime during business hours',
    consent: true,
    marketingConsent: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState(null);
  const [copied, setCopied] = useState(false);

  const categories = [
    'Graphic Design',
    'Web Development',
    'Digital Services',
    'Marketing Services',
    'Legal & Business Support',
    'General Inquiry',
  ];

  const budgetRanges = [
    'Flexible / Not Decided',
    'Below ₹10,000',
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    'Above ₹1,00,000',
  ];

  const timelineOptions = [
    'Immediate (1-2 weeks)',
    'Within 1 month',
    '1 – 3 months',
    'Flexible',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!formData.fullName.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Please provide your contact phone number.');
      return;
    }

    if (!formData.projectDescription.trim()) {
      setError('Please tell us a bit about your project or service requirement.');
      return;
    }

    if (!formData.consent) {
      setError('Please accept the consent terms to allow us to review your inquiry.');
      return;
    }

    setLoading(true);

    try {
      const response = await submitInquiry(formData);
      if (response.success) {
        setSuccessData(response);
        if (onSuccessCallback) {
          onSuccessCallback(response);
        }
      } else {
        setError(response.message || 'Submission could not be completed. Please try again.');
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Unable to connect to the server. Please check your connection or contact us via WhatsApp.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copyReference = () => {
    if (successData?.referenceNumber) {
      navigator.clipboard.writeText(successData.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const resetForm = () => {
    setSuccessData(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      serviceCategory: initialCategory,
      specificService: '',
      projectDescription: '',
      estimatedBudget: 'Flexible / Not Decided',
      expectedTimeline: 'Flexible',
      preferredContactMethod: 'whatsapp',
      bestTimeToContact: 'Anytime during business hours',
      consent: true,
      marketingConsent: true,
    });
  };

  // SUCCESS STATE SCREEN
  if (successData) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-xl text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
          Inquiry Registered Successfully
        </span>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-4 mb-2 font-['Outfit']">
          Thank You, {successData.inquiry?.fullName || formData.fullName}!
        </h3>

        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          Your inquiry has been submitted and entered into our secure management system. Our team will review your specifications and contact you shortly.
        </p>

        {/* Reference Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-sm mx-auto mb-6 text-left">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
            Your Tracking Reference:
          </span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold font-mono text-blue-600 tracking-wider">
              {successData.referenceNumber}
            </span>
            <button
              onClick={copyReference}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              title="Copy Reference"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="text-xs text-slate-500 space-y-1 mb-8">
          <p>Preferred Channel: <strong className="text-slate-700 capitalize">{formData.preferredContactMethod}</strong></p>
          <p>An acknowledgement has been logged for: <strong className="text-slate-700">{formData.email}</strong></p>
        </div>

        <button
          onClick={resetForm}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  // ACTIVE FORM
  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl ${
        compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'
      }`}
    >
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Response Guaranteed</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-['Outfit']">
          Get Started With INOVIQ Global
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tell us about your requirements. We prepare custom proposals within 24 business hours.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      <div className="space-y-4">
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Phone & Company Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Phone / WhatsApp <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 80001 80600"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Company Name (Optional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Your Business / Brand"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category & Specific Service */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Service Domain <span className="text-rose-500">*</span>
            </label>
            <select
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Specific Service / Interest
            </label>
            <input
              type="text"
              name="specificService"
              value={formData.specificService}
              onChange={handleChange}
              placeholder="e.g. 3D Logo, MERN App, Meta Ads"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Requirements Multiline */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Project Description & Requirements <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            rows={compact ? 3 : 4}
            required
            placeholder="Share details about your objectives, desired features, deliverables, or current bottlenecks..."
            className="w-full p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
          ></textarea>
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Estimated Budget
            </label>
            <select
              name="estimatedBudget"
              value={formData.estimatedBudget}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {budgetRanges.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Expected Timeline
            </label>
            <select
              name="expectedTimeline"
              value={formData.expectedTimeline}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              {timelineOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
              { id: 'phone', label: 'Phone Call', icon: '📞' },
              { id: 'email', label: 'Email', icon: '✉️' },
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                  formData.preferredContactMethod === method.id
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method.id}
                  checked={formData.preferredContactMethod === method.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span>{method.icon}</span>
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Best time to contact */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Best Time To Reach You (Optional)
          </label>
          <input
            type="text"
            name="bestTimeToContact"
            value={formData.bestTimeToContact}
            onChange={handleChange}
            placeholder="e.g. Weekday afternoons, 2-5 PM"
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 pt-2">
          <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>
              I consent to INOVIQ GLOBAL PVT. LTD. processing my contact details and requirements for this quotation and consultation. <span className="text-rose-500">*</span>
            </span>
          </label>

          <label className="flex items-start gap-2.5 text-xs text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={handleChange}
              className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>
              Keep me updated occasionally with digital growth tips, offers, and case studies (opt out anytime).
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting Your Inquiry...</span>
              </>
            ) : (
              <>
                <span>Submit Inquiry & Receive Consultation</span>
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400 mt-2">
            🔒 Your information is confidential and will never be shared with third parties.
          </p>
        </div>
      </div>
    </form>
  );
};
