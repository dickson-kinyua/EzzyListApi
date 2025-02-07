import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const profile = async (req, res) => {
  const token = req.cookies?.token;
  // console.log(token);
  if (!token) {
    return res
      .status(400)
      .json({ error: "Access Denied.No token was provided" });
  }

  try {
    jwt.verify(token, process.env.SECRET, {}, (error, userInfo) => {
      if (error) throw error;

      res.status(200).json(userInfo);
    });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};
