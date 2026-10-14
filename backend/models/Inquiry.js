import mongoose from 'mongoose';

const internalNoteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const inquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [25, 'Phone number cannot exceed 25 characters'],
    },
    companyName: {
      type: String,
      trim: true,
      maxlength: [120, 'Company name cannot exceed 120 characters'],
      default: '',
    },
    serviceCategory: {
      type: String,
      required: [true, 'Service category is required'],
      enum: [
        'Graphic Design',
        'Web Development',
        'Digital Services',
        'Marketing Services',
        'Legal & Business Support',
        'General Inquiry',
      ],
    },
    specificService: {
      type: String,
      trim: true,
      default: '',
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    estimatedBudget: {
      type: String,
      trim: true,
      default: 'Flexible / Not Decided',
    },
    expectedTimeline: {
      type: String,
      trim: true,
      default: 'Flexible',
    },
    preferredContactMethod: {
      type: String,
      enum: ['whatsapp', 'phone', 'email'],
      default: 'whatsapp',
    },
    bestTimeToContact: {
      type: String,
      trim: true,
      default: 'Anytime during business hours',
    },
    consent: {
      type: Boolean,
      required: [true, 'You must accept the data processing terms'],
      validate: {
        validator: (v) => v === true,
        message: 'Consent is required to submit an inquiry',
      },
    },
    marketingConsent: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Quoted', 'Converted', 'Closed'],
      default: 'New',
      index: true,
    },
    internalNotes: [internalNoteSchema],
    followUpDate: {
      type: Date,
      default: null,
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for high-performance admin search & filtering
inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ fullName: 'text', email: 'text', companyName: 'text', referenceNumber: 'text' });

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
