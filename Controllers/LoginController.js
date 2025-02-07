import UserModel from "../models/userModel.js";
import { missingInput } from "./missingInputChecker.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
dotenv.config();

export const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (missingInput([userName, password])) {
      return res.status(400).json({ error: "please fill in all the fields" });
    }

    const user = await UserModel.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }

    const passOk = bcrypt.compareSync(password, user.password);

    if (!passOk) {
      return res.status(400).json({ error: "incorrect password" });
    }
    const token = generateToken(res, user);
    res
      .cookie("token", token, {
        httpOnly: true, // Prevent JavaScript access
        secure: true, // Use HTTPS
        sameSite: "None", // Allow cross-origin requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({ userName: user.userName, UserId: user._id });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
};
