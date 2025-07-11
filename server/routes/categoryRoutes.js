const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Category');
const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// POST new category
router.post(
  '/',
  body('name').notEmpty().withMessage('Name is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  }
);

module.exports = router;