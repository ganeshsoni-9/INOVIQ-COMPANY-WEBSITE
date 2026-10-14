import express from 'express';
import {
  getAllServices,
  getServiceBySlug,
  getAdminServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/services', getAllServices);
router.get('/services/:slug', getServiceBySlug);

// Admin protected routes
router.get('/admin/services', protect, getAdminServices);
router.post('/admin/services', protect, createService);
router.put('/admin/services/:id', protect, updateService);
router.delete('/admin/services/:id', protect, deleteService);

export default router;
