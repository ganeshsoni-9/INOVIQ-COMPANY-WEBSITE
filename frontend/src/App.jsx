import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicesIndex } from './pages/ServicesIndex';
import { GraphicDesign } from './pages/services/GraphicDesign';
import { WebDevelopment } from './pages/services/WebDevelopment';
import { DigitalServices } from './pages/services/DigitalServices';
import { MarketingServices } from './pages/services/MarketingServices';
import { LegalBusinessSupport } from './pages/services/LegalBusinessSupport';
import { Portfolio } from './pages/Portfolio';
import { PortfolioDetail } from './pages/PortfolioDetail';
import { Contact } from './pages/Contact';
import { GetAQuote } from './pages/GetAQuote';
import { FAQ } from './pages/FAQ';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { NotFound } from './pages/NotFound';

// Admin Layout & Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminInquiries } from './pages/admin/AdminInquiries';
import { AdminInquiryDetail } from './pages/admin/AdminInquiryDetail';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminPortfolio } from './pages/admin/AdminPortfolio';
import { AdminSettings } from './pages/admin/AdminSettings';

export default function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/graphic-design" element={<GraphicDesign />} />
        <Route path="/services/web-development" element={<WebDevelopment />} />
        <Route path="/services/digital-services" element={<DigitalServices />} />
        <Route path="/services/marketing" element={<MarketingServices />} />
        <Route path="/services/legal-business-support" element={<LegalBusinessSupport />} />
        <Route path="/services/legal" element={<LegalBusinessSupport />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-a-quote" element={<GetAQuote />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Login (Standalone) */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="inquiries/:id" element={<AdminInquiryDetail />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
