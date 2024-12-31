import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtConfig.js';

export function authToken(req, res, next) {
    // Get the token from cookies
    const token = req.cookies.token; // Access the token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Missing token!" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user; // Attach user info to the request
        console.log(user);
        next();
    });
}

export function verifyToken(token) {
    return jwt.verify(token, secretKey);
}