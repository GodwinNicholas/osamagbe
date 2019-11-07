const mongoose = require("mongoose");


const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


module.exports = Group = mongoose.model("Group", GroupSchema);