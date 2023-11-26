"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const router = express_1.default.Router();
const SECRET = process.env.JWT_SECRET_KEY;
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    // checking if user exists
    const alreadyExist = yield User_1.default.findOne({ email, role });
    if (alreadyExist) {
        res.status(403).json({ error: "User already exists" });
    }
    else {
        // hash the password
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(password, salt);
        console.log(hashedPassword);
        // create a new user
        const userDoc = new User_1.default({ email, password: hashedPassword, role });
        yield userDoc.save();
        const token = jsonwebtoken_1.default.sign({ id: userDoc._id.toString() }, SECRET || "", {
            expiresIn: "1h",
        });
        // save this in local storage
        localStorage.setItem("token", token);
        res.json(token);
    }
}));
exports.default = router;
