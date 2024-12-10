import express from 'express';
import { authToken } from '../utils/authMiddleware.js'; // Named import
import User from '../models/userModel.js';

const router = express.Router();

router.get('/profile', authToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        res.json(user);
    } catch (error) {
        console.error(error); // Logging for easier debugging
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;