const orderModel = require('../models/orderModel');
const deliveryModel = require('../models/deliveryModel');

// Place Order
exports.placeOrder = (req, res) => {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one product.' });
    }

    let totalPrice = 0;

    // Calculate total price
    items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });

    // Create Order
    orderModel.createOrder(userId, totalPrice, (err, result) => {
        if (err) return res.status(500).json({ message: 'Order creation failed.', error: err });

        const orderId = result.insertId;

        // Create Delivery Record
        deliveryModel.createDelivery(orderId, (err, deliveryResult) => {
            if (err) return res.status(500).json({ message: 'Delivery creation failed.', error: err });

            // Insert Order Items and Update Inventory
            items.forEach(item => {
                orderModel.createOrderItem(orderId, item.productId, item.quantity, item.price, (err) => {
                    if (err) console.error('Order item error: ', err);
                });

                orderModel.updateProductQuantity(item.productId, item.quantity, (err) => {
                    if (err) console.error('Inventory update error: ', err);
                });
            });

            res.status(201).json({ message: 'Order placed successfully.', orderId });
        });
    });
};

// View User Orders
exports.getUserOrders = (req, res) => {
    const userId = req.user.id;

    orderModel.getOrdersByUser(userId, async (err, orders) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });

        if (orders.length === 0) return res.status(200).json({ orders: [] });

        const detailedOrders = await Promise.all(orders.map(order => {
            return new Promise((resolve, reject) => {
                orderModel.getOrderItems(order.id, (err, items) => {
                    if (err) reject(err);
                    resolve({ ...order, items });
                });
            });
        }));

        res.status(200).json({ orders: detailedOrders });
    });
};

// Track Delivery
exports.trackDelivery = (req, res) => {
    const orderId = req.params.orderId;

    deliveryModel.getDeliveryByOrder(orderId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });

        if (result.length === 0) return res.status(404).json({ message: 'Delivery not found for this order.' });

        res.status(200).json(result[0]);
    });
};
