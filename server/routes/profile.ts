import express, { Request, Response } from "express";
import { authJWT } from "../middleware/auth";
import User from "../models/User";

const router = express.Router();

router.get("/", authJWT, async (req: Request, res: Response) => {
  const { userID } = req.headers;

  const userDoc = await User.findById(userID);
  if (!userDoc) {
    res.status(403).json({ error: "User does not exist" });
    return;
  } else {
    res.json({ id: userDoc._id, email: userDoc.email, role: userDoc.role });
  }
});

export default router;
