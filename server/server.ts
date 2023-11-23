import express , {Request, Response} from "express";
const app = express();

app.get("test", (_req: Request, res: Response) => {
    res.send("Hello World!");
});
