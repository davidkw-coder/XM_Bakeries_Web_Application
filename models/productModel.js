const db = require('../config/db');

// Create Product
const createProduct = (name, price, category, quantity, image_url, callback) => {
    const sql = 'INSERT INTO Products (name, price, category, quantity, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, price, category, quantity, image_url], callback);
};

// Get All Products with Search, Filter, Sort
const getAllProducts = (filters, callback) => {
    let sql = 'SELECT * FROM Products WHERE 1=1';
    const params = [];

    if (filters.name) {
        sql += ' AND name LIKE ?';
        params.push(`%${filters.name}%`);
    }
    if (filters.category) {
        sql += ' AND category = ?';
        params.push(filters.category);
    }
    if (filters.minPrice) {
        sql += ' AND price >= ?';
        params.push(filters.minPrice);
    }
    if (filters.maxPrice) {
        sql += ' AND price <= ?';
        params.push(filters.maxPrice);
    }
    if (filters.minQuantity) {
        sql += ' AND quantity >= ?';
        params.push(filters.minQuantity);
    }
    if (filters.maxQuantity) {
        sql += ' AND quantity <= ?';
        params.push(filters.maxQuantity);
    }
    if (filters.sortBy && (filters.sortBy === 'price' || filters.sortBy === 'quantity')) {
        const sortOrder = filters.sortOrder === 'desc' ? 'DESC' : 'ASC';
        sql += ` ORDER BY ${filters.sortBy} ${sortOrder}`;
    }

    db.query(sql, params, callback);
};

// Get Product by ID
const getProductById = (id, callback) => {
    const sql = 'SELECT * FROM Products WHERE id = ?';
    db.query(sql, [id], callback);
};

// Update Product
const updateProduct = (id, data, callback) => {
    const sql = 'UPDATE Products SET name = ?, price = ?, category = ?, quantity = ?, image_url = ? WHERE id = ?';
    db.query(sql, [data.name, data.price, data.category, data.quantity, data.image_url, id], callback);
};

// Delete Product
const deleteProduct = (id, callback) => {
    const sql = 'DELETE FROM Products WHERE id = ?';
    db.query(sql, [id], callback);
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
