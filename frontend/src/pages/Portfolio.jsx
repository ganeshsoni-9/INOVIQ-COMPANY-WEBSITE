import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Filter, Layers } from 'lucide-react';
import { fetchPortfolio } from '../services/api';

export const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchPortfolio()
      .then((res) => {
        if (res.data) setProjects(res.data);
      })
      .catch((err) => console.warn('Portfolio load failed:', err.message));
  }, []);

  const categories = [
    { id: 'all', label: 'All Demonstration Projects' },
    { id: 'graphic-design', label: 'Graphic Design' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'legal-business-support', label: 'Business Support' },
  ];

  const filteredProjects =
    categoryFilter === 'all'
      ? projects
      : projects.filter((p) => p.categorySlug === categoryFilter);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-[#0B0B0B] text-white py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#C9A227]/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider bg-[#171717] px-3.5 py-1.5 rounded-full border border-[#3A321C]">
            Work Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Our Work & Case Studies
          </h1>
          <p className="text-[#B5B5B5] text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Examine our high-standard deliverables across branding, full-stack web applications, and customer acquisition campaigns.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-[#171717] border border-[#3A321C] max-w-lg mx-auto text-xs text-slate-300">
            ℹ️ <strong>Demonstration Notice:</strong> Case studies below showcase real project frameworks and technical prototypes produced to demonstrate our capabilities.
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  categoryFilter === c.id
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#C9A227] text-[#0B0B0B] font-bold shadow-md'
                    : 'bg-[#171717] text-slate-300 hover:bg-[#222222] border border-[#3A321C]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.slug}
                className="bg-[#171717] rounded-3xl overflow-hidden border border-[#3A321C] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B0B0B] px-3 py-1 rounded-full shadow">
                      {project.category}
                    </span>
                    {project.isSample && (
                      <span className="text-xs font-semibold bg-[#111111]/90 text-[#D4AF37] px-3 py-1 rounded-full border border-[#3A321C]">
                        Demo Project
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1.5">
                      Client Industry: <strong className="text-slate-200">{project.clientIndustry}</strong>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-['Outfit'] group-hover:text-[#D4AF37] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#B5B5B5] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-medium bg-[#111111] border border-[#3A321C] text-slate-300 px-3 py-1 rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#3A321C] flex items-center justify-between">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#D4AF37] hover:text-[#F5E6B3] group"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to="/get-a-quote"
                      className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#111111] border border-[#3A321C] text-slate-300 hover:bg-gradient-to-r hover:from-[#D4AF37] hover:to-[#C9A227] hover:text-[#0B0B0B] transition-colors"
                    >
                      Enquire Similar Project
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
