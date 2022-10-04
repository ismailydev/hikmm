const mongoose = require("mongoose");
const StoreSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        location: {
            type: String,
            default: "unknown",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
