// authMiddleware.js
import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtConfig.js';

export function authToken(req, res, next) {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({ message: "Invalid token format" });
    }
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user;
        console.log(user);
        next();
    });
}

export function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
