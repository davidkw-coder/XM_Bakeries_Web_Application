const productModel = require('../models/productModel');

// Add Product
exports.addProduct = (req, res) => {
    const { name, price, category, quantity, image_url } = req.body;

    if (!name || !price || !category || !quantity) {
        return res.status(400).json({ message: 'Please provide all required product fields.' });
    }

    productModel.createProduct(name, price, category, quantity, image_url || '', (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });
        res.status(201).json({ message: 'Product added successfully.', productId: result.insertId });
    });
};

// Get All Products with Search, Filter, Sort
exports.getProducts = (req, res) => {
    const filters = {
        name: req.query.name,
        category: req.query.category,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        minQuantity: req.query.minQuantity,
        maxQuantity: req.query.maxQuantity,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder
    };

    productModel.getAllProducts(filters, (err, products) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });
        res.status(200).json(products);
    });
};

// Get Product by ID
exports.getProductById = (req, res) => {
    const productId = req.params.id;

    productModel.getProductById(productId, (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Product not found.' });

        res.status(200).json(results[0]);
    });
};

// Update Product
exports.updateProduct = (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;

    productModel.updateProduct(productId, updatedData, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });
        res.status(200).json({ message: 'Product updated successfully.' });
    });
};

// Delete Product
exports.deleteProduct = (req, res) => {
    const productId = req.params.id;

    productModel.deleteProduct(productId, (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error.', error: err });
        res.status(200).json({ message: 'Product deleted successfully.' });
    });
};
