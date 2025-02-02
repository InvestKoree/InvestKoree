// models/commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // Reference to the project the comment belongs to
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FounderPost", // Reference to the FounderPost model (or your project model)
      required: true,
    },
    // Reference to the user who made the comment
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    // The comment text
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;