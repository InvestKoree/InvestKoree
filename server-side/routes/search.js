import founderPost from '../models/founderPostModel.js';
import express from 'express';
const router = express.Router();
router.get("/search", async (req, res) => {
    const { businessName } = req.query;
    try {
      const projects = await founderPost.find({
        businessName: new RegExp(businessName, "i"), // Search case-insensitively
      });
      if (projects.length > 0) {
        res.json(projects); // Return all matching projects
      } else {
        res.status(404).json({ message: "No projects found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching project details" });
    }
  });
  export default router;
