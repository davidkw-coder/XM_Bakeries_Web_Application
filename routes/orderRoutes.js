const express = require('express');
const { placeOrder, getUserOrders, trackDelivery } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Order Routes (Protected)
router.post('/', protect, placeOrder);
router.get('/', protect, getUserOrders);
router.get('/:orderId/track', protect, trackDelivery);

module.exports = router;
