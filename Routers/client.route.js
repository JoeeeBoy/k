const Router = require("express");
const { clientController } = require("../Controllers/client.controllers");
const router = Router();

router.get("/admin/client", clientController.getClient);
router.get("/admin/client/:id", clientController.getIdClient);
router.post("/client", clientController.postClient);
router.delete("/admin/client/:id", clientController.deleteClient);
router.patch("/admin/client/:id", clientController.patchClient);
router.patch("/client/:idclient/books/:id", clientController.toRentBook);
router.patch("/client/:idclient/return/books/:id", clientController.returnBook);
router.patch("/admin/client/:idclient", clientController.adminReturnBookAndBanUser)

module.exports = router;
