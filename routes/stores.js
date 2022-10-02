const express = require("express");
const Store = require("../models/Store");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", (req, res) => {
    res.render("store");
});
router.get("/add", (req, res) => {
    res.render("addStore");
});
router.get("/:id/products/add", (req, res) => {
    res.render("addProduct", { store_id: req.params.id });
});
router.get("/:id", async (req, res) => {
    const store = await Store.findById(req.params.id);
    const stores = (await Store.find({ user: req.user })).filter(
        (store) => store._id !== req.params.id
    );
    const products = await Product.find({ store: req.params.id });
    res.render("store", {
        store,
        stores,
        products,
    });
    console.log(stores);
});
router.post("/add", async (req, res) => {
    try {
        await Store.create({
            name: req.body.name,
            location: req.body.location,
            user: req.user,
        });
        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
    }
});
router.post("/:id/products/add", async (req, res) => {
    try {
        await Product.create({
            name: req.body.name,
            quantity: req.body.quantity,
            store: req.params.id,
            status: req.body.status,
        });
        res.redirect("/stores/" + req.params.id);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
