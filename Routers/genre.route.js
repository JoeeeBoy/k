const Router = require("express");
const { genreController } = require("../Controllers/genre.controller");
const router = Router();

router.get("/genres", genreController.getGenres);
router.get("/genres/:id", genreController.getIdGenre);
router.post("/admin/genres", genreController.postGenre);
router.delete("/admin/genres/:id", genreController.deleteGenre);
router.patch("/admin/genres/:id", genreController.patchGenre);

module.exports = router;
