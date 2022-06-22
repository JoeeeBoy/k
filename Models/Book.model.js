const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  author: String,
  genre: {
    ref: "Genre",
    type: mongoose.SchemaTypes.ObjectId,
  },
  feedbacks: [{
    ref: "Feedback",
    type: mongoose.SchemaTypes.ObjectId,
  }],
  rents: {
    ref: "Client",
    type: mongoose.SchemaTypes.ObjectId,
    default: null
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
