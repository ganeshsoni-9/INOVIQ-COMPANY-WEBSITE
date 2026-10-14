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
      <div className="py-20 text-center text-slate-500">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-xs">Loading inquiry details...</p>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-2">Inquiry Not Found</h3>
        <Link to="/admin/inquiries" className="text-blue-600 text-xs font-bold underline">
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Inquiries</span>
        </Link>

        <span className="text-xs font-mono font-bold bg-slate-200 text-slate-800 px-3 py-1 rounded-full">
          Ref: {inquiry.referenceNumber}
        </span>
      </div>

      {feedbackMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Main Grid: Info + Status Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Client & Requirements Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Customer Details Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Full Name</span>
                <span className="font-bold text-slate-800 text-sm">{inquiry.fullName}</span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Company Name</span>
                <span className="font-semibold text-slate-800 text-sm">
                  {inquiry.companyName || 'Not specified'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Email Address</span>
                <a
                  href={`mailto:${inquiry.email}`}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {inquiry.email}
                </a>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Phone Number</span>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="font-semibold text-blue-600 hover:underline"
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
                className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors"
              >
                Chat on WhatsApp →
              </a>
              <a
                href={`mailto:${inquiry.email}?subject=RE:%20Inquiry%20${inquiry.referenceNumber}%20-%20INOVIQ%20GLOBAL`}
                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
              >
                Send Email Reply →
              </a>
            </div>
          </div>

          {/* Project Requirements Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
              Project Scope & Parameters
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Service Domain</span>
                <span className="font-bold text-slate-800">{inquiry.serviceCategory}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Specific Service</span>
                <span className="font-bold text-slate-800">{inquiry.specificService || '—'}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Estimated Budget</span>
                <span className="font-semibold text-slate-800">{inquiry.estimatedBudget}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block mb-0.5">Timeline</span>
                <span className="font-semibold text-slate-800">{inquiry.expectedTimeline}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Requirements Description
              </span>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                {inquiry.projectDescription}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="text-slate-400 font-semibold">Preferred Channel:</span>{' '}
                <strong className="capitalize text-slate-700">{inquiry.preferredContactMethod}</strong>
              </div>
              <div>
                <span className="text-slate-400 font-semibold">Best Reach Time:</span>{' '}
                <strong className="text-slate-700">{inquiry.bestTimeToContact}</strong>
              </div>
            </div>
          </div>

          {/* Internal Notes History */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
              Internal Admin Notes ({inquiry.internalNotes?.length || 0})
            </h3>

            {/* Note Timeline */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {inquiry.internalNotes && inquiry.internalNotes.length > 0 ? (
                inquiry.internalNotes.map((noteItem, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span className="font-bold text-slate-600">{noteItem.author || 'Admin'}</span>
                      <span>{new Date(noteItem.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="whitespace-pre-line">{noteItem.note}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No notes added yet for this record.</p>
              )}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Add an internal follow-up note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0"
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
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5"
          >
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] border-b border-slate-100 pb-3">
              Status & Pipeline
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Inquiry Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Follow-Up Scheduled Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Update Status'}</span>
            </button>
          </form>

          {/* Submission Audit Metadata */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-xs space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
              Submission Metadata
            </h4>
            <div className="flex justify-between text-slate-500">
              <span>Submitted:</span>
              <strong className="text-slate-700">{new Date(inquiry.createdAt).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Last Modified:</span>
              <strong className="text-slate-700">{new Date(inquiry.updatedAt).toLocaleString()}</strong>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Processing Consent:</span>
              <strong className="text-emerald-600">Granted</strong>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Marketing Consent:</span>
              <strong className={inquiry.marketingConsent ? 'text-emerald-600' : 'text-slate-400'}>
                {inquiry.marketingConsent ? 'Yes' : 'No'}
              </strong>
            </div>
            {inquiry.ipAddress && (
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>IP Address:</span>
                <span className="font-mono">{inquiry.ipAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
