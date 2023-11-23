"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
// importing  routes
const register_1 = __importDefault(require("./routes/register"));
const login_1 = __importDefault(require("./routes/login"));
const profile_1 = __importDefault(require("./routes/profile"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
// general middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
dotenv_1.default.config();
// connecting to mongodb
// console log the url to check if it is correct
mongoose_1.default
    .connect(process.env.MONGO_URL ? process.env.MONGO_URL : "")
    .then(() => {
    console.log("Connected to mongodb");
});
// routes middlewares
app.use("/api/register", register_1.default);
app.use("/api/login", login_1.default);
app.use("/api/profile", profile_1.default);
const PORT = process.env.PORT || 4000;
app.get("/test", auth_1.authJWT, (req, res) => {
    const userID = req.headers.userID;
    res.json({ userID });
});
app.listen(PORT, () => {
    console.log(`Server is running on portss ${PORT}`);
});
