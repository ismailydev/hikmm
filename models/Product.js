const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        status: {
            type: String,
            default: "available",
            enum: ["available", "low", "no stock"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
