const Client = require("../Models/Client.model");
const Book = require("../Models/Book.model");
const Feedback = require("../Models/feedback.model");

module.exports.clientController = {
  postClient: async (req, res) => {
    const { isBlocked, name, feedback, rentBooks } = req.body;
    try {
      await Client.create({
        isBlocked,
        name,
        feedback,
        rentBooks,
      });
      res.json(`Клиент ${name} добавлен!`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteClient: async (req, res) => {
    try {
      await Client.findByIdAndDelete(req.params.id);
      res.json(`Клиент с id:${req.params.id} удален!`);
    } catch (error) {
      console.log(error);
    }
  },
  patchClient: async (req, res) => {
    const { isBlocked, name, feedback, books, rentBooks } = req.body;
    try {
      await Client.findByIdAndUpdate(req.params.id, {
        isBlocked,
        name,
        feedback,
        books,
        rentBooks,
      });
      res.json(`Клиент с id:> ${req.params.id} изменен!`);
    } catch (error) {
      console.log(error);
    }
  },

  getClient: async (req, res) => {
    try {
      res.json(await Client.find({}));
    } catch (error) {
      console.log(error);
    }
  },

  getIdClient: async (req, res) => {
    try {
      res.json(await Client.findById(req.params.id));
    } catch (error) {
      console.log(error);
    }
  },

  getBooks: async (req, res) => {
    try {
      res.json(await Book.find({}).populate("genre"));
    } catch (error) {
      console.log(error);
    }
  },
  getIdBook: async (req, res) => {
    try {
      res.json(
        await Book.findById(req.params.id).populate("author").populate("genre")
      );
    } catch (error) {
      console.log(error);
    }
  },
  getGenreBook: async (req, res) => {
    try {
      res.json(await Book.find({ genre: req.body.genre }));
    } catch (e) {
      res.json(e);
    }
  },

  addFeedback: async (req, res) => {
    const { text, nameAuthor, book } = req.body;
    try {
      await Client.findByIdAndUpdate(req.params.id, {
        $push: {
          feedback: await Feedback.create({
            text,
            nameAuthor,
            book,
          }),
        },
      });
      res.json(`Отзыв к книге ${book} добавлен!`);
    } catch (error) {
      res.json(error);
    }
  },

  toRentBook: async (req, res) => {
    try {
      const user = await Client.findById(req.params.idclient);
      const a = await Book.findById(req.params.id);
      if (
        a.rents === null &&
        user.isBlocked === false &&
        user.rentBooks.length < 3
      ) {
        await Book.findByIdAndUpdate(req.params.id, {
          rents: req.params.idclient,
        });
        await Client.findByIdAndUpdate(req.params.idclient, {
          $push: { rentBooks: req.params.id },
        });
        res.json(
          `Пользователь c id:${req.params.idclient} взял книгу с id: ${req.params.id} в аренду`
        );
      } else {
        res.json(
          "Книга не может быть арендована! Возможны несколько причин: 1. Книга уже в аренде! 2. Пользователь заблокирован! 3. У пользователя уже арендованы 3 книги!"
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  returnBook: async (req, res) => {
    try {
      const user = await Client.findById(req.params.idclient);
      if (user.rentBooks.find((el) => el == req.params.id)) {
        await Book.findByIdAndUpdate(req.params.id, {
          rents: null,
        });
        await Client.findByIdAndUpdate(req.params.idclient, {
          $pull: { rentBooks: req.params.id },
        });
        res.json(
          `Пользователь c id:${req.params.idclient} вернул книгу с id: ${req.params.id}`
        );
      } else {
        res.json("такой книги у пользователя нет");
      }
    } catch (error) {
      console.log(error);
    }
  },
  adminReturnBookAndBanUser: async (req, res) => {
    try {
      const user = await Client.findById(req.params.idclient);
      if (user.rentBooks.find((el) => el == req.body.id)) {
        await Book.findByIdAndUpdate(req.body.id, {
          rents: null,
        });
        await Client.findByIdAndUpdate(req.params.idclient, {
          $pull: { rentBooks: req.body.id},
          isBlocked: true,
        });
        res.json(
          `Пользователь c id:${req.params.idclient} заблокирован, книгА с id: ${req.params.id} возвращена в библиотеку`
        );
      } else {
        await Client.findByIdAndUpdate(req.params.idclient, {
          isBlocked: true,
        });
        res.json(`Пользователь с id: ${req.params.idclient} заблокирован`);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
