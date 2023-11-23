"use strict";
const express = require("express");
const app = express();
app.get("test", (req, res) => {
    res.json({ message: "Hello World" });
});
