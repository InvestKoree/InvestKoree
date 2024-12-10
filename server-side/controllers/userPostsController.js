// controllers/userPostsController.js
import FounderPost from '../models/founderFormPostModels.js';
import mongoose from 'mongoose';


// Get posts by user ID
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }
  try {
    const posts = await FounderPost.find({ userId }); // Find posts by userId
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: 'Server error' });
  }
};