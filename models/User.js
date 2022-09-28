const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            required: true,
        },
        displayName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            enum: ["admin", "user"],
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
