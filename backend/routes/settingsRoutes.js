import express from 'express';
import { getPublicSettings, updateSettings } from '../controllers/settingsController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/settings', getPublicSettings);
router.put('/admin/settings', protect, updateSettings);

export default router;
