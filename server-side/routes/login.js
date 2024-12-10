import express from "express";
import cors from "cors";
import loginController from "../controllers/login.js";


const router = express.Router();
router.use(cors());

router.post("/login", loginController.login);
router.post("/refresh-token", loginController.refreshToken);

export default router;