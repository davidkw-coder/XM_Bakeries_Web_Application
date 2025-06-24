const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// CRUD Routes (Protected)
router.post('/', protect, addProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
