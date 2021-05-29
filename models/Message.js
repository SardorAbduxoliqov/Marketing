const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    age: {
        type: Number,
        required: true,
        min: 1
    },
    phone: {
        type: Number,
        required: true,
        min: 5
    },
    userId: {
        type: String,
        ref: "User",
        required: true
    }

});


module.exports = mongoose.model("Message", messageSchema);