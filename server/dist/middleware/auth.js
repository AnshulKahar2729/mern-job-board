"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET_KEY;
const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(403).json({ error: "Unauthorized, no token !" });
        return;
    }
    else {
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, SECRET || "", (err, payload) => {
            if (err) {
                res.status(403).json({ error: `Unauthorized ${err}` });
                return;
            }
            else if (!payload) {
                res.status(403).json({ error: "Unauthorized, no payload in JWT" });
                return;
            }
            else if (typeof payload === "string") {
                res.status(403).json({ error: "Unauthorized" });
                return;
            }
            else {
                req.headers.userID = payload.id;
                next();
            }
        });
    }
};
exports.authJWT = authJWT;
