import { Service } from '../models/Service.js';

/**
 * @route   GET /api/services
 * @desc    Get all published services (optional category filter)
 * @access  Public
 */
export const getAllServices = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = { isPublished: true };

    if (category) {
      filter.category = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 }).lean();

    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/services/:slug
 * @desc    Get single service by slug
 * @access  Public
 */
export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({
      slug: req.params.slug.toLowerCase(),
      isPublished: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/services
 * @desc    Get all services for admin (including unpublished)
 * @access  Private
 */
export const getAdminServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ category: 1, order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: services.length,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/admin/services
 * @desc    Create a new service
 * @access  Private
 */
export const createService = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      categoryName,
      shortDescription,
      fullDescription,
      benefits,
      features,
      icon,
      image,
      ctaText,
      order,
      isPublished,
      isFeatured,
    } = req.body;

    if (!title || !slug || !category || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug, category, and short description are required.',
      });
    }

    const existingSlug = await Service.findOne({ slug: slug.toLowerCase().trim() });
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: 'A service with this slug already exists. Please choose a unique slug.',
      });
    }

    const service = await Service.create({
      title: title.trim(),
      slug: slug.toLowerCase().trim(),
      category,
      categoryName: categoryName || 'Digital Services',
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription || '',
      benefits: Array.isArray(benefits) ? benefits : [],
      features: Array.isArray(features) ? features : [],
      icon: icon || 'Layers',
      image: image || '',
      ctaText: ctaText || 'Enquire Now',
      order: Number(order) || 0,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      isFeatured: Boolean(isFeatured),
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/admin/services/:id
 * @desc    Update a service
 * @access  Private
 */
export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    const { slug } = req.body;
    if (slug && slug !== service.slug) {
      const existing = await Service.findOne({ slug: slug.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another service already uses this slug.',
        });
      }
      service.slug = slug.toLowerCase().trim();
    }

    const fieldsToUpdate = [
      'title',
      'category',
      'categoryName',
      'shortDescription',
      'fullDescription',
      'benefits',
      'features',
      'icon',
      'image',
      'ctaText',
      'order',
      'isPublished',
      'isFeatured',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        service[field] = req.body[field];
      }
    });

    await service.save();

    res.json({
      success: true,
      message: 'Service updated successfully.',
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/admin/services/:id
 * @desc    Delete a service
 * @access  Private
 */
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found.',
      });
    }

    res.json({
      success: true,
      message: `Service "${service.title}" removed.`,
    });
  } catch (error) {
    next(error);
  }
};
