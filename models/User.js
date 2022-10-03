const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
        },
        displayName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
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
