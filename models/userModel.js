const db = require('../config/db');

const createUser = (name, email, hashedPassword, role, callback) => {
    const sql = 'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, hashedPassword, role], callback);
};

const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) return callback(err, null);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
    });
};

module.exports = { createUser, findUserByEmail };
