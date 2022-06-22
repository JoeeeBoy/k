const Book = require("../Models/Book.model");
const Genre = require("../Models/Genre.model");

module.exports.bookController = {
  postBook: async (req, res) => {
    const { name, author, genre } = req.body;
    try {
      const a = await Book.create({
        name,
        author,
        genre,
      });
      await Genre.findByIdAndUpdate(genre, {
        $push: {books: a._id}
      })
      res.json(`Книга ${name} добавлена!`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteBook: async (req, res) => {
    try {
      await Book.findByIdAndDelete(req.params.id);
      res.json(`Книга с id:${req.params.id} удалена!`);
    } catch (error) {
      console.log(error);
    }
  },
  patchBook: async (req, res) => {
    const { name, author, genre } = req.body;
    try {
      await Book.findByIdAndUpdate(req.params.id, {
        name,
        author,
        genre,
      });
      res.json(`Книга с id:${req.params.id} изменена!`);
    } catch (error) {
      console.log(error);
    }
  },

  getBooks: async (req, res) => {
    try {
      res.json(await Book.find({}).populate("author").populate("genre"));
    } catch (error) {
      console.log(error);
    }
  },

  getIdBook: async (req, res) => {
    try {
      res.json(await Book.findById(req.params.id).populate("author").populate("genre"));
    } catch (error) {
      console.log(error);
    }
  },
};
