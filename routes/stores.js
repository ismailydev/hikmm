const express = require("express");
const Store = require("../models/Store");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", (req, res) => {
    console.log(req.user);
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
    const stores = (await Store.find({ user: req.user }).lean()).filter(
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
            quantity: Number(req.body.quantity),
            store: req.params.id,
            status: req.body.status,
        });
        res.redirect("/stores/" + req.params.id);
    } catch (error) {
        console.log(error);
    }
});
router.put("/:id/products/:prodID/transfer", async (req, res) => {
    try {
        const product = await Product.findOne({
            store: req.params.id,
            _id: req.params.prodID,
        });
        const receiver = await Store.findOne({ name: req.body.store });
        // subtract the transfered product
        await Product.findOneAndUpdate(
            { store: req.params.id, _id: req.params.prodID },
            { quantity: product.quantity - Number(req.body.quantity) }
        );
        // add the transfered product
        // when sending to another store check if the product exits or not first
        const productInStore = await Product.findOne({
            name: product.name,
            store: receiver._id,
        });
        if (productInStore) {
            await Product.findOneAndUpdate(
                { store: productInStore.store, _id: productInStore._id },
                {
                    quantity:
                        productInStore.quantity + Number(req.body.quantity),
                }
            );
        } else {
            await Product.create({
                name: product.name,
                quantity: Number(req.body.quantity),
                store: receiver._id,
                // status: req.body.status,
            });
        }
        await Transaction.create({
            user: req.user._id,
            product: req.params.prodID,
            from: req.params.id,
            to: receiver._id,
            quantity: Number(req.body.quantity),
        });
        res.redirect("/transactions");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
