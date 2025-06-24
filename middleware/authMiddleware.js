const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        token = token.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed.' });
        }
    } else {
        return res.status(401).json({ message: 'Not authorized, no token provided.' });
    }
};

module.exports = { protect };
