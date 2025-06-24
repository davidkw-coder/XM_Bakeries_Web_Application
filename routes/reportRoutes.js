const express = require('express');
const { getSalesReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Sales Report (Protected)
router.get('/sales', protect, getSalesReport);

module.exports = router;
