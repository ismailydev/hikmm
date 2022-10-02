const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");

const connectDB = require("./config/database");

require("dotenv").config();
require("./config/passport")(passport);

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

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING,
        }),
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/stores", require("./routes/stores"));
// app.use("*", (req, res) => res.render("404"));

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
