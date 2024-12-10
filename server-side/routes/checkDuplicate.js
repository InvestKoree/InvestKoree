import express from "express";
import cors from "cors";
import User from "../models/userModel.js";

const router = express.Router();
router.use(cors());
router.post('/check-duplicate', async (req, res) => {
    const { email, phone } = req.body;
    
    try {
      const user = await User.findOne({ $or: [{ email }, { phone }] });
      if (user) {
        return res.json({ duplicate: true });
      }
      res.json({ duplicate: false });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  });
  export default router;