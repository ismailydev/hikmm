const express = require("express");
const morgan = require("morgan");
const path = require("path");
const connectDB = require("./config/db");
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "dist")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
