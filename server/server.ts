import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

// importing  routes
import registerRoutes from "./routes/register";
import loginRoutes from "./routes/login";
import profileRoutes from "./routes/profile";
import searchResultsRoutes from "./routes/searchResults";
import jobsRoutes from "./routes/jobs";
import { authJWT } from "./middleware/auth";
const app = express();

// general middlewares
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
dotenv.config();

// connecting to mongodb
// console log the url to check if it is correct
mongoose
  .connect(process.env.MONGO_URL ? process.env.MONGO_URL : "")
  .then(() => {
    console.log("Connected to mongodb");
  });

// routes middlewares
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/profile", profileRoutes);
app.use("api/searchResults", searchResultsRoutes);
app.use("/api/jobs", jobsRoutes);

const PORT = process.env.PORT || 4000;

app.get("/test", authJWT , (req: Request, res: Response) => {
  const userID = req.headers.userID;
  res.json({ userID });
});

app.listen(PORT, () => {
  console.log(`Server is running on portss ${PORT}`);
});
