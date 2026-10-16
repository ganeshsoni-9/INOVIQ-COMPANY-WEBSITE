import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  Save,
  MessageSquare,
  Send,
  FileText,
} from 'lucide-react';
import {
  fetchAdminInquiryById,
  updateAdminInquiry,
  addAdminInquiryNote,
} from '../../services/api';

export const AdminInquiryDetail = () => {
  const { id } = useParams();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [newNote, setNewNote] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const loadInquiry = () => {
    setLoading(true);
    fetchAdminInquiryById(id)
      .then((res) => {
        if (res.success && res.data) {
          setInquiry(res.data);
          setStatus(res.data.status);
          setFollowUpDate(
            res.data.followUpDate
              ? new Date(res.data.followUpDate).toISOString().slice(0, 10)
              : ''
          );
        }
      })
      .catch((err) => console.warn('Inquiry fetch error:', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiry();
  }, [id]);

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedbackMsg('');
    try {
      const res = await updateAdminInquiry(id, {
        status,
        followUpDate: followUpDate || null,
      });
      if (res.success) {
        setInquiry(res.data);
        setFeedbackMsg('Inquiry status and follow-up saved successfully.');
        setTimeout(() => setFeedbackMsg(''), 4000);
      }
    } catch (err) {
      alert('Error updating inquiry: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const res = await addAdminInquiryNote(id, newNote);
      if (res.success) {
        setNewNote('');
        loadInquiry();
      }
    } catch (err) {
      alert('Error adding note: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-[#B3B3B3]">
        <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-xs">Loading inquiry details...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-8 text-center bg-[#171717] rounded-3xl border border-[#3A3018]">
        <h3 className="text-lg font-bold text-white mb-2">Inquiry Not Found</h3>
        <Link to="/admin/inquiries" className="text-[#D4AF37] text-xs font-bold underline">
          ← Back to Inquiries Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/inquiries"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B3B3B3] hover:text-[#D4AF37] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries</span>
        </Link>

        <span className="text-xs font-mono font-bold bg-[#171717] border border-[#3A3018] text-[#D4AF37] px-3 py-1 rounded-full">
          Ref: {inquiry.referenceNumber}
        </span>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Grid: Info + Status Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Client & Requirements Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Details Box */}
          <div className="bg-[#171717] p-6 sm:p-8 rounded-3xl border border-[#3A3018] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-white font-['Outfit'] border-b border-[#3A3018]/60 pb-3">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Full Name</span>
                <span className="font-bold text-white text-sm">{inquiry.fullName}</span>
              </div>

              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Company Name</span>
                <span className="font-semibold text-white text-sm">
                  {inquiry.companyName || 'Not specified'}
                </span>
              </div>

              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Email Address</span>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-semibold text-[#D4AF37] hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>

              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Phone Number</span>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="font-semibold text-[#D4AF37] hover:underline"
                >
                  {inquiry.phone}
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <a
                href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-semibold hover:bg-emerald-900/50 transition-colors"
              >
                Chat on WhatsApp →
              </a>
              <a
                href={`mailto:${inquiry.email}?subject=RE:%20Inquiry%20${inquiry.referenceNumber}%20-%20INOVIQ%20GLOBAL`}
                className="px-3 py-1.5 rounded-lg bg-[#111111] text-[#D4AF37] border border-[#3A3018] font-semibold hover:bg-[#3A3018]/50 transition-colors"
              >
                Send Email Reply →
              </a>
            </div>
          </div>

          {/* Project Requirements Box */}
          <div className="bg-[#171717] p-6 sm:p-8 rounded-3xl border border-[#3A3018] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-white font-['Outfit'] border-b border-[#3A3018]/60 pb-3">
              Project Scope & Parameters
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Service Domain</span>
                <span className="font-bold text-white">{inquiry.serviceCategory}</span>
              </div>
              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Specific Service</span>
                <span className="font-bold text-white">{inquiry.specificService || '—'}</span>
              </div>
              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Estimated Budget</span>
                <span className="font-semibold text-white">{inquiry.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-[#888888] font-semibold block mb-0.5">Timeline</span>
                <span className="font-semibold text-white">{inquiry.expectedTimeline}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#3A3018]/60">
              <span className="text-xs font-bold text-[#888888] uppercase tracking-wider block mb-2">
                Requirements Description
              </span>
              <div className="p-4 rounded-2xl bg-[#111111] border border-[#3A3018] text-xs sm:text-sm text-white whitespace-pre-line leading-relaxed font-sans">
                {inquiry.projectDescription}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="text-[#888888] font-semibold">Preferred Channel:</span>{' '}
                <strong className="capitalize text-[#B3B3B3]">{inquiry.preferredContactMethod}</strong>
              </div>
              <div>
                <span className="text-[#888888] font-semibold">Best Reach Time:</span>{' '}
                <strong className="text-[#B3B3B3]">{inquiry.bestTimeToContact}</strong>
              </div>
            </div>
          </div>

          {/* Internal Notes History */}
          <div className="bg-[#171717] p-6 sm:p-8 rounded-3xl border border-[#3A3018] shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-white font-['Outfit'] border-b border-[#3A3018]/60 pb-3">
              Internal Admin Notes ({inquiry.internalNotes?.length || 0})
            </h3>

            {/* Note Timeline */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {inquiry.internalNotes && inquiry.internalNotes.length > 0 ? (
                inquiry.internalNotes.map((noteItem, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#111111] border border-[#3A3018] text-xs text-[#B3B3B3]"
                  >
                    <div className="flex items-center justify-between text-[10px] text-[#888888] mb-1">
                      <span className="font-bold text-[#D4AF37]">{noteItem.author || 'Admin'}</span>
                      <span>{new Date(noteItem.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="whitespace-pre-line">{noteItem.note}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#888888] italic">No notes added yet for this record.</p>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Add an internal follow-up note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-[#111111] border border-[#3A3018] text-white placeholder-[#888888] text-xs focus:bg-[#171717] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] text-xs font-bold transition-colors shrink-0"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>

        {/* Right 4 Cols: Status & Timestamps */}
        <div className="lg:col-span-4 space-y-6">
          <form
            onSubmit={handleSaveStatus}
            className="bg-[#171717] p-6 rounded-3xl border border-[#3A3018] shadow-sm space-y-5"
          >
            <h3 className="text-base font-bold text-white font-['Outfit'] border-b border-[#3A3018]/60 pb-3">
              Status & Pipeline
            </h3>

            <div>
              <label className="block text-xs font-bold text-[#B3B3B3] uppercase tracking-wider mb-2">
                Inquiry Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-[#B3B3B3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                {['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#B3B3B3] uppercase tracking-wider mb-2">
                Follow-Up Scheduled Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Update Status'}</span>
            </button>
          </form>

          {/* Submission Audit Metadata */}
          <div className="bg-[#171717] p-6 rounded-3xl border border-[#3A3018] shadow-sm text-xs space-y-3">
            <h4 className="font-bold text-[#B3B3B3] uppercase tracking-wider text-[11px] border-b border-[#3A3018]/60 pb-2">
              Submission Metadata
            </h4>
            <div className="flex justify-between text-[#888888]">
              <span>Submitted:</span>
              <strong className="text-white">{new Date(inquiry.createdAt).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-[#888888]">
              <span>Last Modified:</span>
              <strong className="text-white">{new Date(inquiry.updatedAt).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-[#888888]">
              <span>Processing Consent:</span>
              <strong className="text-emerald-400">Granted</strong>
            </div>
            <div className="flex justify-between text-[#888888]">
              <span>Marketing Consent:</span>
              <strong className={inquiry.marketingConsent ? 'text-emerald-400' : 'text-[#888888]'}>
                {inquiry.marketingConsent ? 'Yes' : 'No'}
              </strong>
            </div>
            {inquiry.ipAddress && (
              <div className="flex justify-between text-[#888888] text-[10px]">
                <span>IP Address:</span>
                <span className="font-mono text-[#B3B3B3]">{inquiry.ipAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
