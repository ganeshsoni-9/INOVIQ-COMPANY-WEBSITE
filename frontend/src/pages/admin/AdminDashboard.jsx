import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  TrendingUp,
  ArrowRight,
  User,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { fetchDashboardStats, downloadInquiriesCSV } from '../../services/api';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = () => {
    setRefreshing(true);
    fetchDashboardStats()
      .then((res) => {
        if (res.success) {
          setData(res);
        }
      })
      .catch((err) => console.warn('Failed to load stats:', err.message))
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadStats();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Progress':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Quoted':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Closed':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm">Fetching real-time business metrics...</p>
      </div>
    );
  }

  const stats = data?.stats || {
    total: 0,
    new: 0,
    inProgress: 0,
    contacted: 0,
    quoted: 0,
    converted: 0,
    closed: 0,
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Business Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time inquiry metrics, active prospects, and domain distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadStats}
            disabled={refreshing}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={downloadInquiriesCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors shadow-md"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
        {[
          { label: 'Total Inquiries', count: stats.total, color: 'text-slate-900 bg-white border-slate-200' },
          { label: 'New', count: stats.new, color: 'text-blue-600 bg-blue-50/50 border-blue-200 font-bold' },
          { label: 'In Progress', count: stats.inProgress, color: 'text-purple-600 bg-purple-50/50 border-purple-200' },
          { label: 'Contacted', count: stats.contacted, color: 'text-amber-600 bg-amber-50/50 border-amber-200' },
          { label: 'Quoted', count: stats.quoted, color: 'text-indigo-600 bg-indigo-50/50 border-indigo-200' },
          { label: 'Converted', count: stats.converted, color: 'text-emerald-600 bg-emerald-50/50 border-emerald-200' },
          { label: 'Closed', count: stats.closed, color: 'text-slate-500 bg-slate-50 border-slate-200' },
        ].map((m, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border shadow-sm flex flex-col justify-between ${m.color}`}
          >
            <span className="text-[11px] uppercase font-semibold text-slate-500 block">
              {m.label}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono mt-2 block">
              {m.count}
            </span>
          </div>
        ))}
      </div>

      {/* Category Breakdown & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Category Distribution */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-4">
            Inquiries by Service Domain
          </h3>
          <div className="space-y-3">
            {data?.categories && data.categories.length > 0 ? (
              data.categories.map((c, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-0">
                  <span className="font-semibold text-slate-700">{c.category}</span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold font-mono bg-blue-50 text-blue-600">
                    {c.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400">No category submissions recorded yet.</p>
            )}
          </div>
        </div>

        {/* Right: Quick Links */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit'] mb-2">
              Management Pipelines
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Quick access to review pending inquiries, configure published catalog items, and view case studies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/inquiries"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 transition-colors group"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 mb-1">
                View All Inquiries →
              </div>
              <div className="text-[11px] text-slate-500">
                Filter by date, category, status & add notes.
              </div>
            </Link>

            <Link
              to="/admin/services"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 transition-colors group"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-purple-600 mb-1">
                Manage Services →
              </div>
              <div className="text-[11px] text-slate-500">
                Add or edit 48+ catalog items.
              </div>
            </Link>

            <Link
              to="/admin/portfolio"
              className="p-4 rounded-2xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 transition-colors group"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 mb-1">
                Portfolio Projects →
              </div>
              <div className="text-[11px] text-slate-500">
                Update case studies and demo labels.
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Recent Customer Submissions
            </h3>
            <p className="text-xs text-slate-500">Latest inquiry records received from public forms.</p>
          </div>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-6">Reference</th>
                <th className="py-3.5 px-6">Client Name</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Contact Via</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6">Received</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.recentInquiries && data.recentInquiries.length > 0 ? (
                data.recentInquiries.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-blue-600">
                      {inq.referenceNumber}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800">{inq.fullName}</div>
                      {inq.companyName && (
                        <div className="text-[10px] text-slate-400">{inq.companyName}</div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {inq.serviceCategory}
                    </td>
                    <td className="py-4 px-6">
                      <span className="capitalize font-semibold text-slate-600">
                        {inq.preferredContactMethod}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(
                          inq.status
                        )}`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/admin/inquiries/${inq._id}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors inline-block"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No inquiry submissions registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
