import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../utils/jwtUtils.js';
import { verifyToken } from '../utils/authMiddleware.js';

// User login function allowing login with either email or phone
async function login(email, password, phone) {
    console.log("Received email:", email); // Log email to verify value
    console.log("Received password:", password); // Log password to verify value
    console.log("Received phone:", phone); // Log phone to verify value
    
    try {
        // Find the user with the provided email or phone
        const query = email ? { email } : { phone };
        const existingUser = await User.findOne(query);

        if (!existingUser) {
            console.error("User not found for email/phone:", email, phone); // Log if user isn't found
            throw new Error("User not found");
        }

        // Compare provided password with hashed password in the database
        const isPassValid = await bcrypt.compare(password, existingUser.password);
        if (!isPassValid) {
            console.error("Password mismatch for email/phone:", email, phone); // Log password mismatch
            throw new Error("Incorrect password");
        }

        // Generate and return token if user is authenticated
        const token = generateToken(existingUser);
        return { token, userId: existingUser._id, role: existingUser.role };

    } catch (error) {
        console.error("Login error:", error.message); // Log detailed error for debugging
        throw new Error("Invalid credentials");
    }
}

// Function to refresh the token
async function refreshToken(oldToken) {
    try {
        // Verify and decode the old token
        const decodedToken = await verifyToken(oldToken); // Ensure `verifyToken` is awaited
        const user = await User.findById(decodedToken._id); // Add `await` to retrieve the user correctly

        if (!user) {
            throw new Error("User not found");
        }

        // Generate a new token and return it
        const newToken = generateToken(user);
        return newToken;

    } catch (error) {
        console.error("Refresh token error:", error.message); // Log detailed error for debugging
        throw new Error("Invalid token");
    }
}

export default { login, refreshToken };
