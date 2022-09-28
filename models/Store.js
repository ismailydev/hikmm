const mongoose = require("mongoose");
const StoreSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Store", StoreSchema);
