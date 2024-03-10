const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController.js");
const { verifyToken } = require('../middleware/authMiddleware.js');
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category API CRUD
 * /v1/category:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Get All Categories
 *     description: Get All Categories.
 *     responses:
 *       '200':
 *         description: success
 *       '400':
 *          description: Error
 *       '500':
 *          description: Internal Server Error
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: success
 *       '400':
 *          description: Error
 *       '500':
 *          description: Internal Server Error
 * path:  
 * /v1/category/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Get single category
 *     description: Get single category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category
 *     responses:
 *       '200':
 *         description: success
 *       '400':
 *          description: Error
 *       '500':
 *          description: Internal Server Error
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Update an existing category
 *     description: Update an existing category.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       '200':
 *         description: success
 *       '400':
 *          description: Error
 *       '500':
 *          description: Internal Server Error
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     summary: Delete a category
 *     description: Delete a category by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       '200':
 *         description: success
 *       '400':
 *          description: Error
 *       '500':
 *          description: Internal Server Error
 */
router.use(verifyToken);
router.get("/", CategoryController.index);
router.post("/", CategoryController.store);
router.get("/:id", CategoryController.show);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.destroy);

module.exports = router;