import express from 'express';
import { authToken } from '../utils/authMiddleware.js';
import Watchlist from '../models/watchlist.js';

const router = express.Router();

// Add post to watchlist
router.post('/add', async (req, res) => {
  const { postId } = req.body;
  console.log("Request Body:", req.body);
console.log("Request Params:", req.params);
console.log("Request Query:", req.query);
  const userId = req.user?.id;

  try {
    let watchlist = await Watchlist.findOne({ userId });

    if (!watchlist) {
      watchlist = new Watchlist({ userId, posts: [] });
    }

    if (!watchlist.posts.includes(postId)) {
      watchlist.posts.push(postId);
    }

    await watchlist.save();
    res.status(200).json({ message: 'Post added to watchlist', watchlist });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Error adding to watchlist', error });
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
  const userId = req.user?.id;

  try {
    const watchlist = await Watchlist.findOne({ userId }).populate('posts');
    res.status(200).json({ watchlist });
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ message: 'Error fetching watchlist', error });
  }
});

export default router;
