import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Save,
  X,
  Layers,
} from 'lucide-react';
import {
  fetchAdminServices,
  createAdminService,
  updateAdminService,
  deleteAdminService,
} from '../../services/api';

export const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'graphic-design',
    categoryName: 'Graphic Design Services',
    shortDescription: '',
    fullDescription: '',
    benefits: '',
    ctaText: 'Enquire Now',
    isPublished: true,
  });

  const loadServices = () => {
    setLoading(true);
    fetchAdminServices()
      .then((res) => {
        if (res.data) setServices(res.data);
      })
      .catch((err) => console.warn('Admin services load failed:', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      title: '',
      slug: '',
      category: 'graphic-design',
      categoryName: 'Graphic Design Services',
      shortDescription: '',
      fullDescription: '',
      benefits: '',
      ctaText: 'Enquire Now',
      isPublished: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      slug: service.slug,
      category: service.category,
      categoryName: service.categoryName,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription || '',
      benefits: Array.isArray(service.benefits) ? service.benefits.join('\n') : '',
      ctaText: service.ctaText || 'Enquire Now',
      isPublished: service.isPublished,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title,
      ...(!editingService && { slug: autoSlug }),
    }));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    const catNames = {
      'graphic-design': 'Graphic Design Services',
      'web-development': 'Web Development Services',
      'digital-services': 'Digital Services',
      marketing: 'Marketing Services',
      'legal-business-support': 'Legal & Business Support',
    };
    setFormData((prev) => ({
      ...prev,
      category,
      categoryName: catNames[category] || 'Digital Services',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      benefits: formData.benefits
        .split('\n')
        .map((b) => b.trim())
        .filter(Boolean),
    };

    try {
      if (editingService) {
        await updateAdminService(editingService._id, payload);
      } else {
        await createAdminService(payload);
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service: ' + err.message);
    }
  };

  const togglePublished = async (service) => {
    try {
      await updateAdminService(service._id, { isPublished: !service.isPublished });
      loadServices();
    } catch (err) {
      alert('Could not update published status: ' + err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete service "${title}"?`)) return;
    try {
      await deleteAdminService(id);
      loadServices();
    } catch (err) {
      alert('Failed to delete service: ' + err.message);
    }
  };

  const filtered =
    categoryFilter === 'all'
      ? services
      : services.filter((s) => s.category === categoryFilter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A3018]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Catalogued Services
          </h2>
          <p className="text-xs sm:text-sm text-[#B3B3B3]">
            Database-backed management for all {services.length} services.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'graphic-design', label: 'Graphic Design' },
          { id: 'web-development', label: 'Web Dev' },
          { id: 'digital-services', label: 'Digital Services' },
          { id: 'marketing', label: 'Marketing' },
          { id: 'legal-business-support', label: 'Legal & Support' },
        ].map((c) => (
          <button
            key={c.id}
            onClick={() => setCategoryFilter(c.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              categoryFilter === c.id
                ? 'bg-[#3A3018]/60 text-[#D4AF37] border-[#D4AF37]/40 shadow-sm'
                : 'bg-[#171717] text-[#B3B3B3] hover:text-white hover:bg-[#222222] border-[#3A3018]'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Services Table */}
      <div className="bg-[#171717] rounded-3xl border border-[#3A3018] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-[#B3B3B3]">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading service directory...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#888888] uppercase tracking-wider text-[10px] font-bold border-b border-[#3A3018]">
                <tr>
                  <th className="py-3.5 px-6">Service Title</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Slug</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3018]/60">
                {filtered.map((service) => (
                  <tr key={service._id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-3.5 px-6 font-bold text-white">
                      {service.title}
                    </td>
                    <td className="py-3.5 px-6 text-[#B3B3B3]">
                      {service.categoryName}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[11px] text-[#888888]">
                      {service.slug}
                    </td>
                    <td className="py-3.5 px-6">
                      <button
                        onClick={() => togglePublished(service)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] border transition-colors ${
                          service.isPublished
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60 hover:bg-emerald-900/40'
                            : 'bg-[#111111] text-[#888888] border-[#3A3018] hover:bg-[#1a1a1a]'
                        }`}
                      >
                        {service.isPublished ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-[#888888]" />
                            <span>Draft</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 rounded-lg bg-[#111111] text-[#D4AF37] border border-[#3A3018] hover:bg-[#3A3018]/50 transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(service._id, service.title)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-900/40 hover:bg-rose-900/60 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171717] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#3A3018] shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#3A3018]/60 mb-6">
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-[#888888] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Slug (URL Path) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Service Category *
                </label>
                <select
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                >
                  <option value="graphic-design">Graphic Design Services</option>
                  <option value="web-development">Web Development Services</option>
                  <option value="digital-services">Digital Services</option>
                  <option value="marketing">Marketing Services</option>
                  <option value="legal-business-support">Legal & Business Support</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                ></textarea>
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Benefits / Deliverables (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                  className="w-full p-3 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs placeholder-[#888888] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-[#111111] border-[#3A3018]"
                />
                <label htmlFor="pubCheck" className="text-xs font-semibold text-[#B3B3B3] cursor-pointer">
                  Publish on live website
                </label>
              </div>

              <div className="pt-4 flex gap-3 border-t border-[#3A3018]/60">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#3A3018] text-xs font-semibold text-[#B3B3B3] hover:bg-[#222222]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] text-xs font-bold shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
