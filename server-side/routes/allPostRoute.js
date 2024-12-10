// server-side/routes/founderRoutes.js
import express from 'express';
import founderPost from '../models/founderPostModel.js';
const router = express.Router();

// Route to get all posts for the admin dashboard
router.get('/allposts', async (req, res) => {
  try {
    const allPosts = await founderPost.find(); // Fetch all posts
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all posts", error });
  }
});

// Other existing routes...

export default router;