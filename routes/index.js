const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/auth.js");
const Store = require("../models/Store.js");
const Transaction = require("../models/Transaction.js");
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

router.get("/dashboard", async (req, res) => {
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

router.get("/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        })
            .populate("product")
            .populate("from")
            .populate("to")
            .lean();
        res.render("transactions", { transactions });
    } catch (error) {}
});

module.exports = router;
