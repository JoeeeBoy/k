const mongoose = require("mongoose");


const clientSchema = mongoose.Schema({
    isBlocked: Boolean,
    name: String,
    feedback: [{
        ref: "Book",
        type: mongoose.SchemaTypes.ObjectId,
    }],
    rentBooks: [{
        ref: "Book",
        type: mongoose.SchemaTypes.ObjectId,
    }],

})

const Client = mongoose.model("Client", clientSchema);

module.exports = Client