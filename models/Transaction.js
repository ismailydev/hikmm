const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
