const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');
const { createUser, findUserByEmail } = require('../models/userModel');

// Register User
exports.register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if user exists
    findUserByEmail(email, async (err, user) => {
        if (user) return res.status(400).json({ message: 'User already exists.' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        createUser(name, email, hashedPassword, role || 'customer', (err, result) => {
            if (err) return res.status(500).json({ message: 'Database error.' });

            const token = generateToken(result.insertId, role || 'customer');
            res.status(201).json({ message: 'User registered successfully.', token });
        });
    });
};

// Login User
exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    findUserByEmail(email, async (err, user) => {
        if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

        const token = generateToken(user.id, user.role);
        res.status(200).json({ message: 'Login successful.', token });
    });
};

exports.register = (req, res) => {
    // Registration logic here
    res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
    // Login logic here
    res.status(200).json({ message: 'Login successful' });
};
