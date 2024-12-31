import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import generateToken from '../utils/jwtUtils.js';

// User login function allowing login with either email or phone
async function login(email, password, phone) {
    try {
        // Find the user with the provided email or phone
        const query = email ? { email } : { phone };
        const existingUser  = await User.findOne(query);

        if (!existingUser ) {
            console.error("User  not found for email/phone:", email, phone);
            throw new Error("User  not found");
        }

        // Compare provided password with hashed password in the database
        const isPassValid = await bcrypt.compare(password, existingUser .password);
        if (!isPassValid) {
            console.error("Password mismatch for email/phone:", email, phone);
            throw new Error("Incorrect password");
        }

        // Generate and return user data (without the token)
        return { userId: existingUser ._id, role: existingUser .role };

    } catch (error) {
        console.error("Login error:", error.message);
        throw new Error("Invalid credentials");
    }
}

async function refreshToken(req, res) {
    const oldToken = req.cookies.token; // Get the token from the cookie
    try {
        const decodedToken = await verifyToken(oldToken);
        const user = await User.findById(decodedToken.id);

        if (!user) {
            return res.status(401).json({ message: "User  not found" });
        }

        // Generate a new token
        const newToken = generateToken(user);

        // Set the new token in an HTTP-only cookie
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.json({ newToken });
    } catch (error) {
        console.error("Refresh token error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}
export default { login, refreshToken };