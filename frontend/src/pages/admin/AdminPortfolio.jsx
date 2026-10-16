import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, Briefcase, Eye } from 'lucide-react';
import {
  fetchAdminPortfolio,
  createAdminPortfolio,
  updateAdminPortfolio,
  deleteAdminPortfolio,
} from '../../services/api';

export const AdminPortfolio = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Graphic Design',
    categorySlug: 'graphic-design',
    clientIndustry: 'Corporate & Technology',
    description: '',
    challenge: '',
    solution: '',
    image: '',
    isSample: true,
  });

  const loadProjects = () => {
    setLoading(true);
    fetchAdminPortfolio()
      .then((res) => {
        if (res.data) setProjects(res.data);
      })
      .catch((err) => console.warn('Portfolio load error:', err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Graphic Design',
      categorySlug: 'graphic-design',
      clientIndustry: 'Corporate & Technology',
      description: '',
      challenge: '',
      solution: '',
      image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      isSample: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      category: project.category,
      categorySlug: project.categorySlug,
      clientIndustry: project.clientIndustry,
      description: project.description,
      challenge: project.challenge || '',
      solution: project.solution || '',
      image: project.image || '',
      isSample: project.isSample !== undefined ? project.isSample : true,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      title,
      ...(!editingProject && { slug }),
    }));
  };

  const handleCategoryChange = (e) => {
    const categorySlug = e.target.value;
    const catMap = {
      'graphic-design': 'Graphic Design',
      'web-development': 'Web Development',
      'digital-services': 'Digital Services',
      marketing: 'Marketing Services',
      'legal-business-support': 'Legal & Business Support',
    };
    setFormData((prev) => ({
      ...prev,
      categorySlug,
      category: catMap[categorySlug] || 'Graphic Design',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateAdminPortfolio(editingProject._id, formData);
      } else {
        await createAdminPortfolio(formData);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert('Error saving project: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete project "${title}"?`)) return;
    try {
      await deleteAdminPortfolio(id);
      loadProjects();
    } catch (err) {
      alert('Error deleting project: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A3018]">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Portfolio Projects
          </h2>
          <p className="text-xs sm:text-sm text-[#B3B3B3]">
            Showcase demonstration case studies and verified work deliverables.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A227] hover:from-[#F5E6B3] hover:to-[#D4AF37] text-[#0B0B0B] font-bold text-xs shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-[#171717] rounded-3xl border border-[#3A3018] shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-[#B3B3B3]">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs">Loading projects...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111111] text-[#888888] uppercase tracking-wider text-[10px] font-bold border-b border-[#3A3018]">
                <tr>
                  <th className="py-3.5 px-6">Project Title</th>
                  <th className="py-3.5 px-6">Category</th>
                  <th className="py-3.5 px-6">Industry</th>
                  <th className="py-3.5 px-6">Badge</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3A3018]/60">
                {projects.map((proj) => (
                  <tr key={proj._id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-white">{proj.title}</div>
                      <div className="text-[11px] text-[#888888] font-mono">/{proj.slug}</div>
                    </td>
                    <td className="py-4 px-6 text-[#B3B3B3] font-medium">{proj.category}</td>
                    <td className="py-4 px-6 text-[#888888]">{proj.clientIndustry}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          proj.isSample
                            ? 'bg-amber-950/60 text-amber-400 border-amber-800/60'
                            : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
                        }`}
                      >
                        {proj.isSample ? 'Demonstration' : 'Live Client'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg bg-[#111111] text-[#D4AF37] border border-[#3A3018] hover:bg-[#3A3018]/50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj._id, proj.title)}
                          className="p-1.5 rounded-lg bg-rose-950/40 text-rose-400 border border-rose-900/40 hover:bg-rose-900/60 transition-colors"
                          title="Delete Project"
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

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#171717] rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#3A3018] shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#3A3018]/60 mb-6">
              <h3 className="text-xl font-bold text-white font-['Outfit']">
                {editingProject ? 'Edit Project' : 'Add Project'}
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
                  Project Title *
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

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                    Domain Category *
                  </label>
                  <select
                    value={formData.categorySlug}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="graphic-design">Graphic Design</option>
                    <option value="web-development">Web Development</option>
                    <option value="digital-services">Digital Services</option>
                    <option value="marketing">Marketing Services</option>
                    <option value="legal-business-support">Legal & Business Support</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                    Client Industry
                  </label>
                  <input
                    type="text"
                    value={formData.clientIndustry}
                    onChange={(e) => setFormData({ ...formData, clientIndustry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                  Summary Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                    Client Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  ></textarea>
                </div>
                <div>
                  <label className="block font-bold text-[#B3B3B3] uppercase tracking-wider mb-1">
                    Our Solution
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#3A3018] bg-[#111111] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="sampleCheck"
                  checked={formData.isSample}
                  onChange={(e) => setFormData({ ...formData, isSample: e.target.checked })}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-[#111111] border-[#3A3018]"
                />
                <label htmlFor="sampleCheck" className="text-xs font-semibold text-[#B3B3B3] cursor-pointer">
                  Label as Demonstration Project (Per transparency standards)
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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
