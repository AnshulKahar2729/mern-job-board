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
  const alreadyExist = await User.findOne({ email });
  if (alreadyExist) {
    res.status(403).json({ error: "User already exists" });
  } else {
    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword);

    // create a new user
    const userDoc = new User({ email, password: hashedPassword });
    await userDoc.save();
    const token = jwt.sign({ id: userDoc._id.toString()}, SECRET || "", { expiresIn: "1h" });
    res.json(token);
  }
});

export default router;
