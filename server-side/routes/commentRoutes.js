import express from "express";
import Comment from "../models/commentModel.js"; // Import the Comment model
import { authToken } from "../utils/authMiddleware.js"; // Middleware to authenticate users

const router = express.Router();

// Route to add a comment
router.post("/add", authToken, async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user.id; // Get the user ID from the authenticated request

  try {
    // Create a new comment
    const newComment = new Comment({
      postId,
      userId,
      text,
    });

    // Save the comment to the database
    await newComment.save();

    // Respond with success
    res.status(201).json({ message: "Comment added successfully!", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment: " + error.message });
  }
});

// Route to fetch comments for a specific project
router.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ postId })
    .populate("userId", "name _id") 
      .sort({ createdAt: -1 }); // Sort by newest first

    // Respond with the comments
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments: " + error.message });
  }
});

export default router;
