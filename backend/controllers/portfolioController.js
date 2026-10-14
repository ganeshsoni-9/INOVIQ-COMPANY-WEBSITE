import { Portfolio } from '../models/Portfolio.js';

/**
 * @route   GET /api/portfolio
 * @desc    Get all portfolio projects (filterable by category)
 * @access  Public
 */
export const getAllPortfolio = async (req, res, next) => {
  try {
    const { category, featured } = req.query;
    const filter = {};

    if (category && category !== 'all') {
      filter.categorySlug = category;
    }

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    const projects = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 }).lean();

    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/portfolio/:slug
 * @desc    Get single portfolio project by slug
 * @access  Public
 */
export const getPortfolioBySlug = async (req, res, next) => {
  try {
    const project = await Portfolio.findOne({
      slug: req.params.slug.toLowerCase(),
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/admin/portfolio
 * @desc    Get all portfolio projects for admin management
 * @access  Private
 */
export const getAdminPortfolio = async (req, res, next) => {
  try {
    const projects = await Portfolio.find().sort({ order: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/admin/portfolio
 * @desc    Create new portfolio project
 * @access  Private
 */
export const createPortfolio = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      category,
      categorySlug,
      clientIndustry,
      description,
      challenge,
      solution,
      outcomes,
      tags,
      image,
      gallery,
      liveUrl,
      isFeatured,
      isSample,
      order,
    } = req.body;

    if (!title || !slug || !category || !categorySlug || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title, slug, category, category slug, and description are required.',
      });
    }

    const existing = await Portfolio.findOne({ slug: slug.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A project with this slug already exists.',
      });
    }

    const project = await Portfolio.create({
      title: title.trim(),
      slug: slug.toLowerCase().trim(),
      category: category.trim(),
      categorySlug,
      clientIndustry: clientIndustry || 'Digital Business',
      description: description.trim(),
      challenge: challenge || '',
      solution: solution || '',
      outcomes: Array.isArray(outcomes) ? outcomes : [],
      tags: Array.isArray(tags) ? tags : [],
      image: image || '',
      gallery: Array.isArray(gallery) ? gallery : [],
      liveUrl: liveUrl || '',
      isFeatured: Boolean(isFeatured),
      isSample: isSample !== undefined ? Boolean(isSample) : true,
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/admin/portfolio/:id
 * @desc    Update portfolio project
 * @access  Private
 */
export const updatePortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const { slug } = req.body;
    if (slug && slug !== project.slug) {
      const existing = await Portfolio.findOne({ slug: slug.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Another project with this slug already exists.',
        });
      }
      project.slug = slug.toLowerCase().trim();
    }

    const fields = [
      'title',
      'category',
      'categorySlug',
      'clientIndustry',
      'description',
      'challenge',
      'solution',
      'outcomes',
      'tags',
      'image',
      'gallery',
      'liveUrl',
      'isFeatured',
      'isSample',
      'order',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        project[field] = req.body[field];
      }
    });

    await project.save();

    res.json({
      success: true,
      message: 'Project updated successfully.',
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/admin/portfolio/:id
 * @desc    Delete portfolio project
 * @access  Private
 */
export const deletePortfolio = async (req, res, next) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: `Project "${project.title}" deleted.`,
    });
  } catch (error) {
    next(error);
  }
};
