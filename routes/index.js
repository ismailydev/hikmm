const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/auth.js");
const Store = require("../models/Store.js");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.get("/signin", (req, res) => {
    res.render("signin");
});
router.get("/transactions", (req, res) => {
    res.render("transactions");
});

router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const stores = await Store.find({ user: req.user.id }).lean();
        res.render("dashboard", {
            name: req.user.displayName,
            stores,
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
