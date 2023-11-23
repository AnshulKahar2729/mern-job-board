import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import epxress, { NextFunction, Request, Response } from "express";

dotenv.config();

const SECRET = process.env.JWT_SECRET_KEY;

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({ error: "Unauthorized, no token !" });
    return;
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET || "", (err, payload) => {
      if (err) {
        res.status(403).json({ error: `Unauthorized ${err}` });
        return;
      } else if (!payload) {
        res.status(403).json({ error: "Unauthorized, no payload in JWT" });
        return;
      } else if (typeof payload === "string") {
        res.status(403).json({ error: "Unauthorized" });
        return;
      } else {
        req.headers.userID = payload.id;
        next();
      }
    });
  }
};
