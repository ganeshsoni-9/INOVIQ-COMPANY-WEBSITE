import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Inbox,
  Layers,
  Briefcase,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldAlert,
  UserCheck,
  FileSpreadsheet,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { adminLogout, downloadInquiriesCSV } from '../services/api';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('INOVIQ_admin_token');
    const storedUser = localStorage.getItem('INOVIQ_admin_user');

    if (!token) {
      navigate('/admin/login', { replace: true, state: { from: location } });
      return;
    }

    if (storedUser) {
      try {
        setAdminUser(JSON.parse(storedUser));
      } catch {
        setAdminUser({ name: 'Admin', email: 'admin@INOVIQglobal.com', role: 'admin' });
      }
    }
  }, [navigate, location]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login', { replace: true });
  };

  const navLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
    { name: 'Services Management', path: '/admin/services', icon: Layers },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: Briefcase },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#111111] text-[#B3B3B3] border-r border-[#3A3018] shrink-0">
        {/* Brand header */}
        <div className="p-6 border-b border-[#3A3018] flex items-center justify-between">
          <Logo variant="dark" />
        </div>

        {/* Navigation list */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider px-3 mb-2">
            Control Panel
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#3A3018]/60 text-[#D4AF37] font-semibold shadow-md border border-[#D4AF37]/30'
                      : 'text-[#888888] hover:text-[#D4AF37] hover:bg-[#171717]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-6">
            <div className="text-[11px] font-bold text-[#888888] uppercase tracking-wider px-3 mb-2">
              Shortcuts
            </div>
            <button
              onClick={downloadInquiriesCSV}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#888888] hover:text-white hover:bg-[#171717] transition-colors text-left"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Export CSV Data</span>
            </button>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#888888] hover:text-white hover:bg-[#171717] transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>Live Website</span>
            </Link>
          </div>
        </div>

        {/* User profile and logout */}
        <div className="p-4 border-t border-[#3A3018] bg-[#171717]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#3A3018]/70 text-[#D4AF37] border border-[#3A3018] flex items-center justify-center font-bold text-xs shrink-0">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">
                  {adminUser?.name || 'Administrator'}
                </p>
                <p className="text-[10px] text-[#888888] truncate">
                  {adminUser?.email || 'admin@INOVIQglobal.com'}
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-[#3A3018]/40 border border-[#3A3018] px-2 py-0.5 rounded-full shrink-0">
              {adminUser?.role || 'Admin'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0B0B]">
        {/* Top Navbar */}
        <header className="h-16 bg-[#111111] border-b border-[#3A3018] px-4 sm:px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#B3B3B3] hover:text-white hover:bg-[#171717]"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
              INOVIQ Global Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={downloadInquiriesCSV}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#3A3018] bg-[#171717] text-xs font-semibold text-[#B3B3B3] hover:text-white hover:bg-[#1c1c1c] transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171717] border border-[#3A3018] text-xs font-semibold text-[#D4AF37] hover:bg-[#3A3018]/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </Link>
          </div>
        </header>

        {/* Content View */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#0B0B0B]">
          <Outlet />
        </div>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative w-72 bg-[#111111] text-[#B3B3B3] border-r border-[#3A3018] flex flex-col z-10 shadow-2xl">
            <div className="p-4 border-b border-[#3A3018] flex items-center justify-between">
              <Logo variant="dark" />
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-[#888888] hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium ${
                        isActive
                          ? 'bg-[#3A3018]/60 text-[#D4AF37] font-semibold border border-[#D4AF37]/30'
                          : 'text-[#888888] hover:text-[#D4AF37] hover:bg-[#171717]'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>

            <div className="p-4 border-t border-[#3A3018]">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-900/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
