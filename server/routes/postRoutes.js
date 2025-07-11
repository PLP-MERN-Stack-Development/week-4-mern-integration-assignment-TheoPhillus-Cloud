const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const upload = require('../middleware/uploadMiddleware'); // image handler

const router = express.Router();

// 📄 GET all posts (with pagination + category)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const total = await Post.countDocuments();

    const posts = await Post.find()
      .populate('category')
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// 📄 GET post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// 📝 POST new post (with image + validation)
router.post(
  '/',
  upload.single('image'),
  body('title').notEmpty().withMessage('Title is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
      const newPost = new Post({ ...req.body, image: imageUrl });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to create post' });
    }
  }
);

// 🛠️ PUT update post (optional image)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const updated = { ...req.body };
    if (imageUrl) updated.image = imageUrl;

    const post = await Post.findByIdAndUpdate(req.params.id, updated, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// 🗑️ DELETE post
router.delete('/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

module.exports = router;