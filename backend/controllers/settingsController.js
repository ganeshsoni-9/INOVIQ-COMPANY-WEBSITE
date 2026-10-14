
import { Setting } from '../models/Setting.js';

const DEFAULT_SETTINGS = {
  companyName: 'INOVIQ GLOBAL PVT. LTD.',
  tagline: 'Ideas Into Impact. Digital Solutions That Grow Your Business.',
  companyEmail: 'info@inoviqglobal.com',
  inquiryEmail: 'inquiries@INOVIQglobal.com',
  companyPhone: '+91 80001 80600',
  whatsappNumber: '+919876543210',

  address: '2nd Floor, Bhawani Plaza, Chandpol Gate, Sikar, Rajasthan 332001',
  officeHours: 'Monday – Saturday: 9:30 AM – 7:00 PM IST',

  socialLinks: {
    facebook: 'https://facebook.com/INOVIQglobal',
    instagram: 'https://instagram.com/INOVIQglobal',
    linkedin: 'https://linkedin.com/company/INOVIQglobal',
    twitter: 'https://twitter.com/INOVIQglobal',
    youtube: 'https://youtube.com/@INOVIQglobal',
  },

  emailNotificationsEnabled: true,

  announcementBar: {
    enabled: true,
    text: '🚀 Accelerate your business growth with INOVIQ GLOBAL — Web, Branding, Digital Marketing & Legal Solutions.',
    ctaText: 'Get a Quote',
    ctaLink: '/get-a-quote',
  },
};

/**
 * @route GET /api/settings
 * @desc Get public site settings
 * @access Public
 */
export const getPublicSettings = async (req, res, next) => {
  try {
    const settingsDoc = await Setting.findOne({
      key: 'site_settings',
    });

    const settings = settingsDoc
      ? settingsDoc.value
      : DEFAULT_SETTINGS;

    res.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route PUT /api/admin/settings
 * @desc Update site settings
 * @access Private
 */
export const updateSettings = async (req, res, next) => {
  try {
    const existing = await Setting.findOne({
      key: 'site_settings',
    });

    const currentVal =
      existing && existing.value
        ? existing.value
        : DEFAULT_SETTINGS;

    const mergedValue = {
      ...currentVal,
      ...req.body,
    };

    const updated = await Setting.findOneAndUpdate(
      { key: 'site_settings' },
      {
        $set: {
          key: 'site_settings',
          value: mergedValue,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: 'Site settings updated successfully.',
      data: updated.value,
    });
  } catch (error) {
    next(error);
  }
};
