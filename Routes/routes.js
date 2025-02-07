import express from "express";
import { register } from "../Controllers/RegisterController.js";
import { login } from "../Controllers/LoginController.js";
import { logout } from "../Controllers/LogoutController.js";
// import { profile } from "../Controllers/profileController.js";
import { createPost } from "../Controllers/NewPostController.js";
import { fetchPosts } from "../Controllers/FetchPostsController.js";
import { deletePost } from "../Controllers/DeletePostController.js";
import { deleteAllPosts } from "../Controllers/DeleteAllPostsController.js";
import { profile } from "../Controllers/profileController.js";
import { authenticateToken } from "../Authentication/AuthenticateToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);
router.post("/createPost", authenticateToken, createPost);
router.get("/fetchPosts", authenticateToken, fetchPosts);
router.delete("/deletePost/:id", deletePost);
router.delete("/deleteAllPosts", deleteAllPosts);

export default router;
