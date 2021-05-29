const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
        unique: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    resetToken: String,
    resetTokenExpiration: Date
});

module.exports = mongoose.model("User", userSchema);