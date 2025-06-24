const db = require('../config/db');

// Create Delivery Record
const createDelivery = (orderId, callback) => {
    const sql = 'INSERT INTO Deliveries (order_id) VALUES (?)';
    db.query(sql, [orderId], callback);
};

// Get Delivery Status
const getDeliveryByOrder = (orderId, callback) => {
    const sql = 'SELECT * FROM Deliveries WHERE order_id = ?';
    db.query(sql, [orderId], callback);
};

module.exports = { createDelivery, getDeliveryByOrder };
