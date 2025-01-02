// server-side/routes/founderRoutes.js
import express from 'express';
import founderPost from '../models/founderPostModel.js';
const router = express.Router();
// Route to get all latest posts
router.get('/latestposts', async (req, res) => {
  try {
    const latestPosts = await founderPost.find().sort({ createdAt: -1 }); 
    res.status(200).json(latestPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest posts", error });
  }
});
router.get('/projectdetail/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await founderPost.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error fetching project details", error });
  }
});
router.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await founderPost.findById(id);

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post details", error });
  }
});


export default router;
