const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");

router.get("/", UserController.index);
// router.get("/:id", UserController.show);
// router.put("/:id", UserController.update);
router.post("/store", UserController.store);
// router.delete("/:id", UserController.destroy);

module.exports = router;