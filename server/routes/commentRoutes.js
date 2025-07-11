const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();

// GET all comments for a post
router.get('/posts/:id/comments', async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: -1 });
  res.json(comments);
});

// POST a new comment for a post
router.post('/posts/:id/comments', async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    post: req.params.id,
    author: req.body.author || 'Anonymous'
  });

  await comment.save();
  res.status(201).json(comment);
});

module.exports = router;