const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  text: String,
  nameAuthor: {
    ref: "Client",
    type: mongoose.SchemaTypes.ObjectId,
  },
  book: {
    ref: "Book",
    type: mongoose.SchemaTypes.ObjectId,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
