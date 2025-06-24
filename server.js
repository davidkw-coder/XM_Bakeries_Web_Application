const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Database connection
const db = require('./config/db');

dotenv.config();

const app = express();

// Body Parser Middleware
app.use(bodyParser.json());

// Test DB Connection
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reports', reportRoutes);

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to XM Bakery API');
});

// Error Handler for Unknown Routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found.' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

