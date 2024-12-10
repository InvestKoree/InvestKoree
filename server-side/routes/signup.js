import express from 'express';
import signupController from '../controllers/signup.js';
import cors from 'cors';

const router = express.Router();
router.use(cors());

// Use /register directly since it’s applied under the /users path
router.post("/register", signupController.createUser);

export default router;