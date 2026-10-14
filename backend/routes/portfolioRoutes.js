import express from 'express';
import {
  getAllPortfolio,
  getPortfolioBySlug,
  getAdminPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/portfolio', getAllPortfolio);
router.get('/portfolio/:slug', getPortfolioBySlug);

// Admin protected routes
router.get('/admin/portfolio', protect, getAdminPortfolio);
router.post('/admin/portfolio', protect, createPortfolio);
router.put('/admin/portfolio/:id', protect, updatePortfolio);
router.delete('/admin/portfolio/:id', protect, deletePortfolio);

export default router;
