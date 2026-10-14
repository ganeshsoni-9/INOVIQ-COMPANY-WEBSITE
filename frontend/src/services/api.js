import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor to attach JWT token for admin endpoints
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('INOVIQ_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 unauth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const isAuthUrl = error.config.url.includes('/admin/auth/login');
      if (!isAuthUrl && window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('INOVIQ_admin_token');
        localStorage.removeItem('INOVIQ_admin_user');
        if (window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

/* ================= PUBLIC API ENDPOINTS ================= */

export const submitInquiry = async (formData) => {
  const response = await api.post('/inquiries', formData);
  return response.data;
};

export const fetchServices = async (category = '') => {
  const url = category ? `/services?category=${encodeURIComponent(category)}` : '/services';
  const response = await api.get(url);
  return response.data;
};

export const fetchServiceBySlug = async (slug) => {
  const response = await api.get(`/services/${encodeURIComponent(slug)}`);
  return response.data;
};

export const fetchPortfolio = async (category = '') => {
  const url = category ? `/portfolio?category=${encodeURIComponent(category)}` : '/portfolio';
  const response = await api.get(url);
  return response.data;
};

export const fetchPortfolioBySlug = async (slug) => {
  const response = await api.get(`/portfolio/${encodeURIComponent(slug)}`);
  return response.data;
};

export const fetchSiteSettings = async () => {
  const response = await api.get('/settings');
  return response.data;
};

/* ================= ADMIN AUTH ENDPOINTS ================= */

export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('INOVIQ_admin_token', response.data.token);
    localStorage.setItem('INOVIQ_admin_user', JSON.stringify(response.data.admin));
  }
  return response.data;
};

export const adminGetMe = async () => {
  const response = await api.get('/admin/auth/me');
  return response.data;
};

export const adminLogout = () => {
  localStorage.removeItem('INOVIQ_admin_token');
  localStorage.removeItem('INOVIQ_admin_user');
};

/* ================= ADMIN INQUIRY ENDPOINTS ================= */

export const fetchAdminInquiries = async (params = {}) => {
  const response = await api.get('/admin/inquiries', { params });
  return response.data;
};

export const fetchAdminInquiryById = async (id) => {
  const response = await api.get(`/admin/inquiries/${id}`);
  return response.data;
};

export const updateAdminInquiry = async (id, data) => {
  const response = await api.patch(`/admin/inquiries/${id}`, data);
  return response.data;
};

export const addAdminInquiryNote = async (id, note) => {
  const response = await api.post(`/admin/inquiries/${id}/notes`, { note });
  return response.data;
};

export const deleteAdminInquiry = async (id) => {
  const response = await api.delete(`/admin/inquiries/${id}`);
  return response.data;
};

export const fetchDashboardStats = async () => {
  const response = await api.get('/admin/dashboard/stats');
  return response.data;
};

export const downloadInquiriesCSV = () => {
  const token = localStorage.getItem('INOVIQ_admin_token');
  const downloadUrl = `${API_BASE}/admin/inquiries/export/csv`;
  
  // Use fetch with auth header and trigger browser download
  fetch(downloadUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `INOVIQ-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
};

/* ================= ADMIN SERVICE ENDPOINTS ================= */

export const fetchAdminServices = async () => {
  const response = await api.get('/admin/services');
  return response.data;
};

export const createAdminService = async (data) => {
  const response = await api.post('/admin/services', data);
  return response.data;
};

export const updateAdminService = async (id, data) => {
  const response = await api.put(`/admin/services/${id}`, data);
  return response.data;
};

export const deleteAdminService = async (id) => {
  const response = await api.delete(`/admin/services/${id}`);
  return response.data;
};

/* ================= ADMIN PORTFOLIO ENDPOINTS ================= */

export const fetchAdminPortfolio = async () => {
  const response = await api.get('/admin/portfolio');
  return response.data;
};

export const createAdminPortfolio = async (data) => {
  const response = await api.post('/admin/portfolio', data);
  return response.data;
};

export const updateAdminPortfolio = async (id, data) => {
  const response = await api.put(`/admin/portfolio/${id}`, data);
  return response.data;
};

export const deleteAdminPortfolio = async (id) => {
  const response = await api.delete(`/admin/portfolio/${id}`);
  return response.data;
};

/* ================= ADMIN SETTINGS ENDPOINTS ================= */

export const updateAdminSettings = async (data) => {
  const response = await api.put('/admin/settings', data);
  return response.data;
};

export default api;
