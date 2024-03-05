const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        jwt.verify(token, 'shhhhh');
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

function verifyTokenAdmin(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        jwt.verify(token, 'shhhhh', (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const userRole = decoded.role;
                if (userRole === 'Super Admin') {
                    next();
                } else {
                    return res.status(403).json({ message: 'Forbidden' });
                }
            }
        });
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

module.exports = verifyToken;
module.exports = verifyTokenAdmin;