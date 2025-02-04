import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

const CommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [ReplySchema], // Embedded replies
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
