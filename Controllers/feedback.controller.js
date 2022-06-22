const Book = require("../Models/Book.model");
const Client = require("../Models/Client.model");
const Feedback = require("../Models/feedback.model");

module.exports.feedbackController = {
  postFeedback: async (req, res) => {
    const { text, nameAuthor} = req.body;
    const { book } = req.params;
    try {
      await Book.findByIdAndUpdate(book, {
        $push: {
          feedbacks: await Feedback.create({
            text,
            nameAuthor,
            book
          })
        }
      })
      await Client.findByIdAndUpdate(nameAuthor, {
        $push: {feedback: book}
      })
      
      res.json(`Отзыв добавлен!`);
    } catch (e) {
      console.log(e);
    }
  },

  deleteFeedback: async (req, res) => {
    try {
      await Feedback.findByIdAndDelete(req.params.id);
      res.json(`Отзыв с id:${req.params.id} удален!`);
    } catch (error) {
      console.log(error);
    }
  },
  patchFeedback: async (req, res) => {
    const { text, nameAuthor, book } = req.body;
    try {
      await Feedback.findByIdAndUpdate(req.params.id, {
        text,
        nameAuthor,
        book,
      });
      res.json(`Отзыв с id:${req.params.id} изменен!`);
    } catch (e) {
      console.log(e);
    }
  },

  getFeedback: async (req, res) => {
    try {
      res.json(await Feedback.find({}).populate("book"));
    } catch (e) {
      console.log(e);
    }
  },

  getIdFeedback: async (req, res) => {
    try {
      res.json(await Feedback.findById(req.params.id).populate("book", "name"));
    } catch (e) {
      res.json(e);
    }
  },
};
