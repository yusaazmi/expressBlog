const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController.js");
const verifyToken = require('../middleware/authMiddleware.js');

router.use(verifyToken);

router.get("/", CategoryController.index);
router.post("/", CategoryController.store);
router.get("/:id", CategoryController.show);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

module.exports = router;