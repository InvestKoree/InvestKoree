import express from 'express';
import { authToken } from '../utils/authMiddleware.js';
import Watchlist from '../models/watchlist.js';

const router = express.Router();

// Add post to watchlist
router.post('/add',authToken, async (req, res) => {
    try {
        const { postId } = req.body; // Ensure `postId` is sent in the request body
        const userId = req.user._id; // Assuming user authentication middleware

        // Find the watchlist for the user
        const watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }

        // Check if the post is already in the watchlist
        const isPostInWatchlist = watchlist.posts.some(
            (post) => post.toString() === postId.toString()
        );

        if (isPostInWatchlist) {
            return res.status(400).json({ message: "Post already in watchlist" });
        }

        // Add the post to the watchlist
        watchlist.posts.push(postId);
        await watchlist.save();

        res.status(200).json({ message: "Post added to watchlist", watchlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding post to watchlist", error });
    }
});

// Remove post from watchlist
router.delete('/remove/:postId', authToken, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user?.id;

  try {
    const watchlist = await Watchlist.findOne({ userId });

    if (watchlist) {
      watchlist.posts = watchlist.posts.filter((id) => id.toString() !== postId);
      await watchlist.save();
    }

    res.status(200).json({ message: 'Post removed from watchlist', watchlist });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Error removing from watchlist', error });
  }
});

// Get user's watchlist
router.get('/', authToken, async (req, res) => {
   try {
        const userId = req.user._id; // Assuming user authentication middleware
        const watchlist = await Watchlist.findOne({ userId });

        if (!watchlist) {
            return res.status(404).json({ message: "Watchlist not found" });
        }

        res.status(200).json({ watchlist });
    } catch (error) {
        res.status(500).json({ message: "Error fetching watchlist", error });
    }
});

export default router;
