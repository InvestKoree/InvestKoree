// routes/userPostsRoute.js
import express from 'express';
import { getUserPosts } from '../controllers/userPostsController.js'; // Import the controller function
import FounderPost from '../models/founderFormPostModels.js';
const router = express.Router();

// Route to get posts by user ID
router.get('/:userId/posts', getUserPosts);
router.get('/founderposts/:postId', async (req, res) => {
    try {
      const post = await FounderPost.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching post', error });
    }
  });

export default router;
