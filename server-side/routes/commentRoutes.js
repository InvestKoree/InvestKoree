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
// Route to add a reply to a comment
router.post("/:commentId/reply", authToken, async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Add reply to the comment
    const reply = { userId, text };
    comment.replies.push(reply);

    await comment.save();

    res.status(201).json({ message: "Reply added successfully!", reply });
  } catch (error) {
    console.error("Error adding reply:", error);
    res.status(500).json({ message: "Error adding reply: " + error.message });
  }
});

// Route to get replies for a comment
router.get("/:commentId/replies", async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId).populate({
      path: "replies.userId", // Explicitly populate the nested field
      select: "name _id",
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment.replies);
  } catch (error) {
    console.error("Error fetching replies:", error);
    res.status(500).json({ message: "Error fetching replies: " + error.message });
  }
});
router.delete("/:commentId", authToken, async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id; // Get logged-in user ID

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the owner of the comment
 
    await Comment.findByIdAndDelete(commentId); // Delete comment from database

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment: " + error.message });
  }
});

// Route to delete a reply (Only the reply owner can delete)
router.delete("/:commentId/reply/:replyId", authToken, async (req, res) => {
  const { commentId, replyId } = req.params;
  const userId = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Find the reply index in the replies array
    const replyIndex = comment.replies.findIndex(reply => reply._id.toString() === replyId);

    if (replyIndex === -1) {
      return res.status(404).json({ message: "Reply not found" });
    }


  
    // Remove reply from array
    comment.replies.splice(replyIndex, 1);
    await comment.save();

    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.error("Error deleting reply:", error);
    res.status(500).json({ message: "Error deleting reply: " + error.message });
  }
});

export default router;
