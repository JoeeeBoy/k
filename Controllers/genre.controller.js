
const Genre = require("../Models/Genre.model");

module.exports.genreController = {
  postGenre: async (req, res) => {
    const { name, info, books } = req.body;
    try {
      await Genre.create({
        name,
        info,
        books
      });
      res.json(`Жанр ${name} добавлен!`);
    } catch (error) {
      console.log(error);
    }
  },

  deleteGenre: async (req, res) => {
    try {
      await Genre.findByIdAndDelete(req.params.id);
      res.json(`Жанр с id:${req.params.id} удален!`);
    } catch (error) {
      console.log(error);
    }
  },
  patchGenre: async (req, res) => {
    const { name, info, books } = req.body;
    try {
     await Genre.findByIdAndUpdate(req.params.id, {
        name,
        info,
        books
      });
      res.json(`Жанр с id:${req.params.id} изменен!`);
    } catch (error) {
      console.log(error);
    }
  },

  getGenres: async (req, res) => {
    try {
      res.json(await Genre.find({}));
    } catch (error) {
      console.log(error);
    }
  },

  getIdGenre: async (req, res) => {
    try {
      res.json(await Genre.findById(req.params.id));
    } catch (error) {
      console.log(error);
    }
  },
};
