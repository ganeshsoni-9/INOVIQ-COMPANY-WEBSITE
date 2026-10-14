import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Service slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category slug is required'],
      enum: [
        'graphic-design',
        'web-development',
        'digital-services',
        'marketing',
        'legal-business-support',
      ],
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
      default: 'Digital Services',
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    fullDescription: {
      type: String,
      trim: true,
      default: '',
    },
    benefits: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    icon: {
      type: String,
      default: 'Layers',
    },
    image: {
      type: String,
      default: '',
    },
    ctaText: {
      type: String,
      default: 'Enquire Now',
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ category: 1, order: 1 });

export const Service = mongoose.model('Service', serviceSchema);
