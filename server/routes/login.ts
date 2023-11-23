import express, { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const router = express.Router();

const SECRET = process.env.JWT_SECRET_KEY;

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // checking if user exists
  const userDoc = await User.findOne({ email });
  if (!userDoc) {
    res.status(403).json({ error: "User does not exist" });
    return;
  } else {
    const isPasswordCorrect = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordCorrect) {
      res.status(403).json({ error: "Password is incorrect" });
      return;
    } else {
      const token = jwt.sign({ id: userDoc._id.toString() }, SECRET || "", {
        expiresIn: "1h",
      });
      res.json(token);
    }
  }
});

export default router;
