const db = require('../config/db');

// Create Order
const createOrder = (userId, totalPrice, callback) => {
    const sql = 'INSERT INTO Orders (user_id, total_price) VALUES (?, ?)';
    db.query(sql, [userId, totalPrice], callback);
};

// Create Order Items
const createOrderItem = (orderId, productId, quantity, price, callback) => {
    const sql = 'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';
    db.query(sql, [orderId, productId, quantity, price], callback);
};

// Update Product Inventory
// Called when order is placed, decreases product quantity
const updateProductQuantity = (productId, orderedQuantity, callback) => {
    const checkLowStockAndAlert = (productId, callback) => {
        const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendLowStockEmail = (product) => {
    const mailOptions = {
        from: 'kidcoderman@gmail.com',
        to: 'kidcardo75@gmail.com',
        subject: 'Low Stock Alert',
        text: `${product.name} is low on stock. Remaining: ${product.quantity}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.error('Email failed: ', error);
        console.log('Low stock email sent:', info.response);
    });
};

        const sql = `SELECT name, quantity FROM Products WHERE id = ?`;
        db.query(sql, [productId], (err, result) => {
            if (err) return callback(err);
    
            const product = result[0];
            if (product.quantity <= 5) { // You can customize threshold
                console.log(`🚨 ALERT: Low stock for ${product.name}, only ${product.quantity} left!`);
                // Optionally trigger an email or push notification here
            }
            callback(null);
        });
    };
    
    // Update this inside your updateProductQuantity function:
    updateProductQuantity(productId, orderedQuantity, (err) => {
        if (err) return res.status(400).json({ message: err.message });
    
        checkLowStockAndAlert(productId, (err) => {
            if (err) console.error('Low stock check failed:', err.message);
        });
    
        // Continue processing response...
    });
    
    const sql = `
        UPDATE Products 
        SET quantity = quantity - ? 
        WHERE id = ? AND quantity >= ?`; // Prevent negative stock

    db.query(sql, [orderedQuantity, productId, orderedQuantity], (err, result) => {
        if (err) return callback(err);
        if (result.affectedRows === 0) return callback(new Error('Insufficient stock or invalid product'));
        callback(null, result);
    });
};


// Get Orders by User
const getOrdersByUser = (userId, callback) => {
    const sql = 'SELECT * FROM Orders WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [userId], callback);
};

// Get Order Items
const getOrderItems = (orderId, callback) => {
    const sql = 'SELECT * FROM OrderItems WHERE order_id = ?';
    db.query(sql, [orderId], callback);
};



module.exports = { createOrder, createOrderItem, updateProductQuantity, getOrdersByUser, getOrderItems };

