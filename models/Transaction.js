const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
