import mongoose from "mongoose";
import PostModel from "../models/PostModel.js";
import jwt from "jsonwebtoken";

export const fetchPosts = async (req, res) => {
  try {
    const userId = req.user?.userId; // Ensure req.user is available
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID provided" });
    }

    const id = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;
    if (!id) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const posts = await PostModel.find({ author: id })
      .populate("author", ["userName"])
      .sort({ createdAt: -1 });

    if (posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
