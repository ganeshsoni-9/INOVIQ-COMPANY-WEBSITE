import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Building,
  Tag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { fetchPortfolioBySlug } from '../services/api';
import { InquiryForm } from '../components/InquiryForm';

export const PortfolioDetail = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPortfolioBySlug(slug)
      .then((res) => {
        if (res.data) setProject(res.data);
      })
      .catch((err) => console.warn('Case study fetch error:', err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading case study...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-32 text-center max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">
          The requested portfolio case study could not be located.
        </p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Breadcrumb & Hero */}
      <section className="bg-[#0B0B0B] text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#C9A227]/5 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#F5E6B3] mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider bg-[#D4AF37] text-[#0B0B0B] px-3 py-1 rounded-full">
              {project.category}
            </span>
            {project.isSample && (
              <span className="text-xs font-semibold bg-[#171717] text-[#D4AF37] px-3 py-1 rounded-full border border-[#3A321C]">
                Demonstration Case Study
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] leading-tight mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#B5B5B5] pt-2 border-t border-[#3A321C]">
            <div>
              Industry: <strong className="text-white">{project.clientIndustry}</strong>
            </div>
            <div>
              Deliverable Domain: <strong className="text-[#D4AF37]">{project.category}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-[#111111] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Hero Image */}
          <div className="rounded-3xl overflow-hidden border border-[#3A321C] shadow-xl mb-12">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-80 sm:h-[450px] object-cover"
            />
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            <div className="p-8 rounded-3xl bg-[#171717] border border-[#3A321C]">
              <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">
                The Client Challenge
              </h3>
              <p className="text-sm text-[#B5B5B5] leading-relaxed">
                {project.challenge || project.description}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#171717] border border-[#3A321C]">
              <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">
                Our Strategic Solution
              </h3>
              <p className="text-sm text-[#B5B5B5] leading-relaxed">
                {project.solution || 'We engineered a cohesive, high-performance strategy combining user experience design, modular software components, and targeted marketing funnels.'}
              </p>
            </div>
          </div>

          {/* Key Deliverable Outcomes */}
          {project.outcomes && project.outcomes.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-white mb-6 font-['Outfit']">
                Key Deliverables & Commercial Impact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.outcomes.map((outcome, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#171717] border border-[#3A321C] shadow-sm flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-200">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-16 pt-8 border-t border-[#3A321C] flex flex-wrap gap-2">
            {project.tags?.map((t, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#111111] border border-[#3A321C] text-slate-300"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Embedded Consultation Form */}
          <div className="pt-8 border-t border-[#3A321C]">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                Want To Build A Similar Project For Your Brand?
              </h3>
              <p className="text-xs sm:text-sm text-[#B5B5B5] mt-1">
                Tell us about your objectives. We will deliver a tailored proposal within 24 hours.
              </p>
            </div>
            <InquiryForm
              initialCategory={project.category}
              initialService={project.title}
              compact={true}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
