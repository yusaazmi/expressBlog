const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Access denied' });
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

function verifyTokenAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({
            code: 401,
            message: "Akses ditolak"
        });
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    code: 401,
                    message: 'Unauthorized'
                });
            } else {
                const userRole = decoded.role;
                if (userRole === 'Super Admin') {
                    next();
                } else {
                    return res.status(403).json({
                        code: 403,
                        message: "Forbidden! Kamu tidak memiliki akses admin"
                    });
                }
            }
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

module.exports = verifyToken, verifyTokenAdmin;