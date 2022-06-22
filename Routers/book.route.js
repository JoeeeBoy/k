const Router = require("express");
const { bookController } = require("../Controllers/book.controllers");
const router = Router();

router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getIdBook);
router.post("/admin/books", bookController.postBook);
router.delete("/admin/books/:id", bookController.deleteBook);
router.patch("/admin/books/:id", bookController.patchBook);

module.exports = router;
