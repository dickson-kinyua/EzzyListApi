import PostModel from "../models/PostModel.js";
import { missingInput } from "./missingInputChecker.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createPost = async (req, res) => {
  const { item, quantity } = req.body;
  const userId = req.user?.userId; // Ensure req.user is available

  if (missingInput([item, quantity])) {
    return res.status(400).json({ error: "Please fill in all the fields" });
  }

  try {
    const newPost = await PostModel.create({
      item,
      quantity,
      author: userId,
    });
    if (!newPost) {
      return res.status(401).json({ error: "could not create post" });
    }
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};
