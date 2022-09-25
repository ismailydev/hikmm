const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 7000;

connectDB();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
