import express from 'express';
import {
  submitInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  addInquiryNote,
  deleteInquiry,
  getDashboardStats,
  exportInquiriesCSV,
} from '../controllers/inquiryController.js';
import { protect } from '../middleware/auth.js';
import { inquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public inquiry endpoints
router.post('/inquiries', inquiryLimiter, submitInquiry);
router.post('/contact', inquiryLimiter, submitInquiry);

// Admin protected endpoints
router.get('/admin/dashboard/stats', protect, getDashboardStats);
router.get('/admin/inquiries', protect, getAllInquiries);
router.get('/admin/inquiries/export/csv', protect, exportInquiriesCSV);
router.get('/admin/inquiries/:id', protect, getInquiryById);
router.patch('/admin/inquiries/:id', protect, updateInquiryStatus);
router.post('/admin/inquiries/:id/notes', protect, addInquiryNote);
router.delete('/admin/inquiries/:id', protect, deleteInquiry);

export default router;
