import jwt from 'jsonwebtoken';
import secretKey from '../config/jwtConfig.js';

// Middleware for token and role verification
export function authToken(requiredRole) {
    return (req, res, next) => {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).json({ message: "Unauthorized: Missing token!" });
        }

        // Split the Bearer token
        const [bearer, token] = authHeader.split(" ");
        if (bearer !== "Bearer" || !token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        // Verify the token
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            // Attach the user to the request
            req.user = user;
            console.log(user); // Logs user info for debugging

            // Role-based authorization check
            if (requiredRole && user.role !== requiredRole) {
                return res.status(403).json({ message: "Access denied: Insufficient permissions" });
            }

            next(); // Proceed to the route
        });
    };
}

// Function to verify a token directly
export function verifyToken(token) {
    return jwt.verify(token, secretKey);
}
