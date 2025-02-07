import UserModel from "../models/userModel.js";
import { missingInput } from "./missingInputChecker.js";
import { passwordChecker } from "./passwordMatchChecker.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
const salt = bcrypt.genSaltSync(10);

export const register = async (req, res) => {
  const { userName, password, confirm } = req.body;

  try {
    if (missingInput([userName, password, confirm])) {
      return res
        .status(400)
        .json({ error: "Please fill in all the required fields" });
    }

    if (!passwordChecker(password, confirm)) {
      return res.status(401).json({ error: "passwords do not match" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await UserModel.create({
      userName,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(401).json({ error: "Unexpected error" });
    }

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "interna server error" });
  }
};
