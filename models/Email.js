const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    user: {
        type: Object,
        required: true
    }
});

module.exports = Email = mongoose.model("Email", EmailSchema);