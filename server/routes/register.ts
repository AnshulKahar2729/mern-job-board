import express, { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const SECRET = process.env.JWT_SECRET_KEY;

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // checking if user exists
  const alreadyExist = await User.findOne({ email });
  if (alreadyExist) {
    res.status(403).json({ error: "User already exists" });
  } else {
    // creating new user
    
    const userDoc = new User({ email, password });
    await userDoc.save();
    const token = jwt.sign({ userDoc }, SECRET || "", { expiresIn: "24h" });
    res.json(token);
  }
});

export default router;
