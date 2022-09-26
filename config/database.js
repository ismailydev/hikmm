const mongoose = require("mongoose");

module.exports = async function () {
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log(`Database Connected!`);
    } catch (error) {
        console.log(error);
    }
};
