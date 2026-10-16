import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Trash2,
  Edit3,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  Eye,
  CheckCircle,
} from 'lucide-react';
import {
  fetchAdminInquiries,
  deleteAdminInquiry,
  updateAdminInquiry,
  downloadInquiriesCSV,
} from '../../services/api';

export const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Delete modal state
  const [deletingId, setDeletingId] = useState(null);
  const [deletingRef, setDeletingRef] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadInquiries = () => {
    setLoading(true);
    fetchAdminInquiries({
      page,
      limit: 10,
      q: searchQuery,
      status: statusFilter,
      category: categoryFilter,
      sortBy,
      sortOrder,
    })
      .then((res) => {
        if (res.success) {
          setInquiries(res.data);
          setPagination(res.pagination);
        }
      })
      .catch((err) => console.warn('Inquiries load error:', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadInquiries();
  }, [page, statusFilter, categoryFilter, sortBy, sortOrder]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadInquiries();
  };

  const handleQuickStatusChange = async (id, newStatus) => {
    try {
      await updateAdminInquiry(id, { status: newStatus });
      loadInquiries();
    } catch (err) {
      alert('Could not update status: ' + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      await deleteAdminInquiry(deletingId);
      setDeletingId(null);
      loadInquiries();
    } catch (err) {
      alert('Failed to delete inquiry: ' + err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-950/60 text-blue-400 border-blue-800/60';
      case 'In Progress':
        return 'bg-purple-950/60 text-purple-400 border-purple-800/60';
      case 'Contacted':
        return 'bg-amber-950/60 text-amber-400 border-amber-800/60';
      case 'Quoted':
        return 'bg-indigo-950/60 text-indigo-400 border-indigo-800/60';
      case 'Converted':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60';
      case 'Closed':
        return 'bg-[#111111] text-[#888888] border-[#3A3018]';
      default:
        return 'bg-[#111111] text-[#888888] border-[#3A3018]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A3018]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Customer Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-[#B3B3B3]">
            {pagination.total} total inquiries logged across all channels.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadInquiriesCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] text-xs font-bold shadow-sm transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#171717] p-5 rounded-2xl border border-[#3A3018] shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by customer name, email, phone, reference, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111111] border border-[#3A3018] text-white placeholder-[#888888] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] text-xs font-bold transition-colors shrink-0"
          >
            Search Records
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#3A3018]/60 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#888888] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#3A3018] bg-[#111111] text-[#B3B3B3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {['All', 'New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#888888] font-medium">Domain:</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#3A3018] bg-[#111111] text-[#B3B3B3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              {[
                'All',
                'Graphic Design',
                'Web Development',
                'Digital Services',
                'Marketing Services',
                'Legal & Business Support',
                'General Inquiry',
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#888888] font-medium">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-[#3A3018] bg-[#111111] text-[#B3B3B3] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
              setCategoryFilter('All');
              setPage(1);
            }}
            className="ml-auto text-[#D4AF37] hover:text-[#F5E6B3] font-semibold"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#171717] rounded-3xl border border-[#3A3018] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-[#B3B3B3]">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading inquiries...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#888888] uppercase tracking-wider text-[10px] font-bold border-b border-[#3A3018]">
                <tr>
                  <th className="py-3.5 px-6">Reference</th>
                  <th className="py-3.5 px-6">Customer & Company</th>
                  <th className="py-3.5 px-6">Service Domain</th>
                  <th className="py-3.5 px-6">Contact Preference</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3018]/60">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => (
                    <tr key={inq._id} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-[#D4AF37]">
                        <Link to={`/admin/inquiries/${inq._id}`} className="hover:underline">
                          {inq.referenceNumber}
                        </Link>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{inq.fullName}</div>
                        <div className="text-[11px] text-[#B3B3B3]">{inq.email}</div>
                        <div className="text-[10px] text-[#888888]">{inq.phone}</div>
                        {inq.companyName && (
                          <div className="text-[10px] font-semibold text-[#D4AF37] mt-0.5">
                            🏢 {inq.companyName}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{inq.serviceCategory}</div>
                        {inq.specificService && (
                          <div className="text-[11px] text-[#888888]">{inq.specificService}</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className="capitalize font-semibold text-[#B3B3B3] bg-[#111111] border border-[#3A3018] px-2.5 py-1 rounded-lg">
                          {inq.preferredContactMethod}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={inq.status}
                          onChange={(e) => handleQuickStatusChange(inq._id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${getStatusBadge(
                            inq.status
                          )}`}
                        >
                          {['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'].map(
                            (s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            )
                          )}
                        </select>
                      </td>
                      <td className="py-4 px-6 text-[#888888]">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/inquiries/${inq._id}`}
                            className="p-1.5 rounded-lg bg-[#111111] text-[#D4AF37] border border-[#3A3018] hover:bg-[#3A3018]/50 transition-colors"
                            title="View & Edit Notes"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              setDeletingId(inq._id);
                              setDeletingRef(inq.referenceNumber);
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-900/40 hover:bg-rose-900/60 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-12 text-center text-[#888888]">
                      No inquiries match your current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="p-4 bg-[#111111] border-t border-[#3A3018] flex items-center justify-between text-xs text-[#888888]">
          <div>
            Showing Page <strong className="text-white">{pagination.page}</strong> of{' '}
            <strong className="text-white">{pagination.totalPages}</strong> ({pagination.total} entries)
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-[#3A3018] bg-[#171717] text-[#B3B3B3] hover:text-white hover:bg-[#222222] disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-semibold px-2 text-[#B3B3B3]">Page {page}</span>
            <button
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page >= pagination.totalPages}
              className="p-1.5 rounded-lg border border-[#3A3018] bg-[#171717] text-[#B3B3B3] hover:text-white hover:bg-[#222222] disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#171717] rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#3A3018] shadow-2xl text-center">
            <div className="w-12 h-12 bg-rose-950/60 border border-rose-900/60 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-['Outfit']">
              Delete Inquiry {deletingRef}?
            </h3>
            <p className="text-xs text-[#888888] mb-6">
              This action cannot be undone. Are you sure you wish to delete this customer record?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#3A3018] text-xs font-semibold text-[#B3B3B3] hover:bg-[#222222]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
