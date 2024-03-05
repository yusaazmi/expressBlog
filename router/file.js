const express = require("express");
const router = express.Router();

const FileController = require("../controllers/fileController.js");
const verifyToken = require('../middleware/authMiddleware.js');

router.use(verifyToken);

router.post('/', FileController.uploadFile, FileController.uploadFileHandler);

module.exports = router;