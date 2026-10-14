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
      <section className="bg-[#0A192F] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-800 px-3.5 py-1.5 rounded-full border border-slate-700">
            Work Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 font-['Outfit']">
            Our Work & Case Studies
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Examine our high-standard deliverables across branding, full-stack web applications, and customer acquisition campaigns.
          </p>

          <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700 max-w-lg mx-auto text-xs text-slate-300">
            ℹ️ <strong>Demonstration Notice:</strong> Case studies below showcase real project frameworks and technical prototypes produced to demonstrate our capabilities.
          </div>
        </div>
      </section>

      {/* Filter Tabs & Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategoryFilter(c.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  categoryFilter === c.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
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
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider bg-blue-600 text-white px-3 py-1 rounded-full shadow">
                      {project.category}
                    </span>
                    {project.isSample && (
                      <span className="text-xs font-semibold bg-slate-900/90 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                        Demo Project
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-1.5">
                      Client Industry: <strong className="text-slate-600">{project.clientIndustry}</strong>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-['Outfit'] group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-lg"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/portfolio/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 group"
                    >
                      <span>Read Full Case Study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to="/get-a-quote"
                      className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white transition-colors"
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
