const express = require("express");
const router = express.Router();

const PostController = require("../controllers/postController.js");
const { verifyToken } = require('../middleware/authMiddleware.js');

router.use(verifyToken);

router.get("/", PostController.index);
router.post("/", PostController.store);
router.get("/:id", PostController.show);
router.put("/:id", PostController.update);
router.delete("/:id", PostController.destroy);
router.get("/get-by-slug/:slug", PostController.getBySlug);

module.exports = router;