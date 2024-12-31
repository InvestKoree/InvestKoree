import authService from "../services/login.js";

async function login(req, res) {
    try {
        const { email, password,phone } = req.body;
        const { token, userId, role } = await authService.login(email, password,phone); 

        if (!token) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

       
        res.json({
            token,
            userId,
            role
        });
    } catch (error) {
        console.error(" login error:", error.message);
        res.status(401).json({ message: "Invalid Credentials" });
    }
}

async function refreshToken(req, res) {
    try {
        const { token } = req.body;
        const newToken = await authService.refreshToken(token);

        res.json({ newToken });
    } catch (error) {
        console.error(" refresh token error:", error.message);
        res.status(401).json({ message: "Invalid token" });
    }
}

export default { login, refreshToken };