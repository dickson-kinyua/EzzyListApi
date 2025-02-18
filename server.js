import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./Routes/routes.js";

dotenv.config();

const app = express();
const db = process.env.MONGODB;
const port = process.env.PORT;
const frontend_url = process.env.FRONTEND_URL;

//middleware

app.use(
  cors({
    credentials: true,
    origin: "https://ezzylst-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());
app.use(express.json());
// Middleware to parse URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose
  .connect(db)
  .then((result) => {
    console.log("Connected to the database");
    app.listen(port, () => console.log(`Listening to port ${port}`));
  })
  .catch((error) => console.log("Could not connect to the database"));

app.use(routes);
