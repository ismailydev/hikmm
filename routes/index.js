const express = require("express");
const { ensureAuth, ensureGuest } = require("../middlewares/auth.js");
const Product = require("../models/Product.js");
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

router.get("/dashboard", ensureAuth, async (req, res) => {
    try {
        const stores = await Store.find({ user: req.user.id }).lean();
        const products = [];
        for (let i = 0; i < stores.length; i++) {
            products.push({
                qty: await Product.find({ store: stores[i]._id })
                    .lean()
                    .count(),
            });
        }
        res.render("dashboard", {
            name: req.user.displayName,
            stores: stores,
            productsQty: products,
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/transactions", ensureAuth, async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user.id,
        })
            .sort({ createdAt: "desc" })
            .populate("product")
            .populate("from")
            .populate("to")
            .lean();
        res.render("transactions", {
            transactions,
            name: req.user.displayName,
        });
    } catch (error) {}
});

module.exports = router;
