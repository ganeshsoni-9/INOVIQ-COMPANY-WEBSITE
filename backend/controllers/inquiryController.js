import mongoose from 'mongoose';
import { Inquiry } from '../models/Inquiry.js';
import { sendAdminInquiryNotification, sendCustomerAcknowledgement } from '../services/emailService.js';

// Helper to generate unique reference number
const generateReferenceNumber = () => {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 5; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `INQ-${year}-${randomStr}`;
};

// Safe CSV sanitizer to prevent CSV/Formula injection
const sanitizeCSV = (val) => {
  if (val === null || val === undefined) return '""';
  let str = String(val).replace(/"/g, '""');
  // If first character is risky formula trigger, prefix with apostrophe
  if (/^[=+@\-\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str}"`;
};

/**
 * @route   POST /api/inquiries
 * @desc    Submit new customer service inquiry or quote request
 * @access  Public (Rate limited)
 */
export const submitInquiry = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      serviceCategory,
      specificService,
      projectDescription,
      estimatedBudget,
      expectedTimeline,
      preferredContactMethod,
      bestTimeToContact,
      consent,
      marketingConsent,
    } = req.body;

    // Server-side validation
    if (!fullName || !email || !phone || !serviceCategory || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Phone, Service Category, and Requirements).',
      });
    }

    if (!consent) {
      return res.status(400).json({
        success: false,
        message: 'You must provide consent for processing your inquiry.',
      });
    }

    // Email regex check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Accidental duplicate prevention: check for same email + category in last 60 seconds
    const recentDuplicate = await Inquiry.findOne({
      email: email.toLowerCase().trim(),
      serviceCategory,
      createdAt: { $gte: new Date(Date.now() - 60 * 1000) },
    });

    if (recentDuplicate) {
      return res.status(200).json({
        success: true,
        message: 'Your inquiry was recently received and is already registered in our system.',
        referenceNumber: recentDuplicate.referenceNumber,
        inquiry: {
          id: recentDuplicate._id,
          referenceNumber: recentDuplicate.referenceNumber,
          fullName: recentDuplicate.fullName,
          email: recentDuplicate.email,
          createdAt: recentDuplicate.createdAt,
        },
      });
    }

    // Generate unique reference number with collision check
    let referenceNumber = generateReferenceNumber();
    let collision = await Inquiry.findOne({ referenceNumber });
    while (collision) {
      referenceNumber = generateReferenceNumber();
      collision = await Inquiry.findOne({ referenceNumber });
    }

    const ipAddress = req.ip || req.headers['x-forwarded-for'] || '';

    const newInquiry = await Inquiry.create({
      referenceNumber,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      companyName: companyName ? companyName.trim() : '',
      serviceCategory,
      specificService: specificService ? specificService.trim() : '',
      projectDescription: projectDescription.trim(),
      estimatedBudget: estimatedBudget || 'Flexible / Not Decided',
      expectedTimeline: expectedTimeline || 'Flexible',
      preferredContactMethod: preferredContactMethod || 'whatsapp',
      bestTimeToContact: bestTimeToContact ? bestTimeToContact.trim() : 'Anytime during business hours',
      consent: Boolean(consent),
      marketingConsent: Boolean(marketingConsent),
      status: 'New',
      ipAddress,
    });

    // Trigger async email notifications non-blockingly
    sendAdminInquiryNotification(newInquiry).catch((err) =>
      console.warn('[Inquiry] Failed to dispatch admin email:', err.message)
    );
    sendCustomerAcknowledgement(newInquiry).catch((err) =>
      console.warn('[Inquiry] Failed to dispatch customer email:', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. Our team will contact you shortly.',
      referenceNumber: newInquiry.referenceNumber,
      inquiry: {
        id: newInquiry._id,
        referenceNumber: newInquiry.referenceNumber,
        fullName: newInquiry.fullName,
        email: newInquiry.email,
        serviceCategory: newInquiry.serviceCategory,
        preferredContactMethod: newInquiry.preferredContactMethod,
        createdAt: newInquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/inquiries
 * @desc    Get all inquiries with search, filter, pagination
 * @access  Private
 */
export const getAllInquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const { q, status, category, startDate, endDate, sortBy, sortOrder } = req.query;

    const query = {};

    // Search filter across referenceNumber, fullName, email, companyName, phone
    if (q && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      query.$or = [
        { referenceNumber: searchRegex },
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { companyName: searchRegex },
      ];
    }

    // Status filter
    if (status && status !== 'All') {
      query.status = status;
    }

    // Category filter
    if (category && category !== 'All') {
      query.serviceCategory = category;
    }

    // Date range filter
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const sortField = sortBy || 'createdAt';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query)
        .sort({ [sortField]: sortDirection })
        .skip(skip)
        .limit(limit)
        .lean(),
      Inquiry.countDocuments(query),
    ]);

    res.json({
      success: true,
      data: inquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/inquiries/:id
 * @desc    Get single inquiry details
 * @access  Private
 */
export const getInquiryById = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID format.',
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }
    res.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/admin/inquiries/:id
 * @desc    Update inquiry status or follow-up date
 * @access  Private
 */
export const updateInquiryStatus = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID format.',
      });
    }

    const { status, followUpDate, internalNote } = req.body;
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    if (status) {
      const validStatuses = ['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}`,
        });
      }
      inquiry.status = status;
    }

    if (followUpDate !== undefined) {
      if (!followUpDate) {
        inquiry.followUpDate = null;
      } else {
        const parsedDate = new Date(followUpDate);
        if (isNaN(parsedDate.getTime())) {
          return res.status(400).json({
            success: false,
            message: 'Invalid follow-up date format. Expected YYYY-MM-DD or ISO date string.',
          });
        }
        inquiry.followUpDate = parsedDate;
      }
    }

    if (internalNote && internalNote.trim()) {
      inquiry.internalNotes.push({
        note: internalNote.trim(),
        author: req.admin ? req.admin.name : 'Admin',
        createdAt: new Date(),
      });
    }

    await inquiry.save();

    res.json({
      success: true,
      message: 'Inquiry updated successfully.',
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/admin/inquiries/:id/notes
 * @desc    Add internal note to inquiry
 * @access  Private
 */
export const addInquiryNote = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID format.',
      });
    }

    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Note content cannot be empty.',
      });
    }

    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    inquiry.internalNotes.push({
      note: note.trim(),
      author: req.admin ? req.admin.name : 'Admin',
      createdAt: new Date(),
    });

    await inquiry.save();

    res.json({
      success: true,
      message: 'Note added successfully.',
      data: inquiry.internalNotes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/admin/inquiries/:id
 * @desc    Delete inquiry record
 * @access  Private (Admin/Superadmin)
 */
export const deleteInquiry = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid inquiry ID format.',
      });
    }

    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    res.json({
      success: true,
      message: `Inquiry ${inquiry.referenceNumber} has been removed.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/dashboard/stats
 * @desc    Get dashboard metrics & summary counts
 * @access  Private
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      total,
      newCount,
      inProgressCount,
      contactedCount,
      quotedCount,
      convertedCount,
      closedCount,
      recentInquiries,
      categoryStats,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Inquiry.countDocuments({ status: 'In Progress' }),
      Inquiry.countDocuments({ status: 'Contacted' }),
      Inquiry.countDocuments({ status: 'Quoted' }),
      Inquiry.countDocuments({ status: 'Converted' }),
      Inquiry.countDocuments({ status: 'Closed' }),
      Inquiry.find().sort({ createdAt: -1 }).limit(6).lean(),
      Inquiry.aggregate([
        {
          $group: {
            _id: '$serviceCategory',
            count: { $sum: 1 },
          },
        },
      ]),
    ]);

    res.json({
      success: true,
      stats: {
        total,
        new: newCount,
        inProgress: inProgressCount,
        contacted: contactedCount,
        quoted: quotedCount,
        converted: convertedCount,
        closed: closedCount,
      },
      categories: categoryStats.map((c) => ({
        category: c._id || 'Unassigned',
        count: c.count,
      })),
      recentInquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/inquiries/export/csv
 * @desc    Export inquiries as safe CSV
 * @access  Private
 */
export const exportInquiriesCSV = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();

    const headers = [
      'Reference Number',
      'Full Name',
      'Email',
      'Phone',
      'Company Name',
      'Service Category',
      'Specific Service',
      'Estimated Budget',
      'Expected Timeline',
      'Preferred Contact Method',
      'Best Time to Contact',
      'Status',
      'Date Submitted',
    ];

    const rows = inquiries.map((inq) => [
      sanitizeCSV(inq.referenceNumber),
      sanitizeCSV(inq.fullName),
      sanitizeCSV(inq.email),
      sanitizeCSV(inq.phone),
      sanitizeCSV(inq.companyName || ''),
      sanitizeCSV(inq.serviceCategory),
      sanitizeCSV(inq.specificService || ''),
      sanitizeCSV(inq.estimatedBudget || ''),
      sanitizeCSV(inq.expectedTimeline || ''),
      sanitizeCSV(inq.preferredContactMethod || ''),
      sanitizeCSV(inq.bestTimeToContact || ''),
      sanitizeCSV(inq.status),
      sanitizeCSV(new Date(inq.createdAt).toISOString()),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="INOVIQ-inquiries-${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
