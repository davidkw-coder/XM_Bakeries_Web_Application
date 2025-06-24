const db = require('../config/db');

// Total Sales (sum of all order totals)
const getTotalSales = (callback) => {
    const sql = `SELECT SUM(total_price) AS totalSales FROM Orders`;
    db.query(sql, callback);
};

// Best-selling Products (sum of quantities ordered, top 5)
const getBestSellingProducts = (callback) => {
    const sql = `
        SELECT p.id, p.name, SUM(oi.quantity) AS totalSold
        FROM OrderItems oi
        JOIN Products p ON oi.product_id = p.id
        GROUP BY p.id, p.name
        ORDER BY totalSold DESC
        LIMIT 5`;
    db.query(sql, callback);
};

// Low Stock Products (threshold configurable, default 10)
const getLowStockProducts = (threshold, callback) => {
    const sql = `SELECT id, name, quantity FROM Products WHERE quantity <= ? ORDER BY quantity ASC`;
    db.query(sql, [threshold], callback);
};

module.exports = { getTotalSales, getBestSellingProducts, getLowStockProducts };
