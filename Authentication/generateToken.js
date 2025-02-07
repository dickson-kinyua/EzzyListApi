import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, userName: user.userName }, //payload
    process.env.SECRET, //secret key
    {}
  );
};
