import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";

const router = express.Router();

router.post("/", async(req : Request, res : Response, next : NextFunction) => {

})

export default router;