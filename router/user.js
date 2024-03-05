const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");

const verifyTokenAdmin = require('../middleware/authMiddleware.js');

router.use(verifyTokenAdmin);
router.get("/", UserController.index);
router.post("/", UserController.store);
router.get("/:id", UserController.show);
// router.put("/:id", UserController.update);
// router.delete("/:id", UserController.destroy);

module.exports = router;