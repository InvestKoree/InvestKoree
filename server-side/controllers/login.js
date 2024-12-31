import authService from "../services/login.js";

async function login(req, res) {
    try {
        const { email, password, phone } = req.body;
        const { userId, role } = await authService.login(email, password, phone); 

        // Generate the token after successful login
        const token = generateToken({ _id: userId, role }); // Generate token with user ID and role

        // Set the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true, // Prevents JavaScript access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict', // Prevents CSRF attacks
        });

        res.json({
            userId,
            role
        });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(401).json({ message: "Invalid Credentials" });
    }
}
export default {login};