const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController.js");

const { verifyTokenAdmin } = require('../middleware/authMiddleware.js');
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API User, hanya bisa diakses menggunakan token superadmin
 * /v1/user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Retrieve all users
 *     description: Retrieve all users.
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: Super Admin / Creator
 *               status:
 *                 type: string
 *                 example: Active / Suspend
 *     responses:
 *       '201':
 *         description: Created successfully
 *       '400':
 *         description: Bad request
 * /v1/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Retrieve a user by ID
 *     description: Retrieve a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to retrieve
 *     responses:
 *       '200':
 *         description: Retrieved successfully
 *       '404':
 *         description: User not found
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Update a user
 *     description: Update a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: Super Admin / Creator
 *               status:
 *                 type: string
 *                 example: Active / Suspend
 *     responses:
 *       '200':
 *         description: Updated successfully
 *       '400':
 *         description: Bad request
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     description: Delete a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user to delete
 *     responses:
 *       '204':
 *         description: Deleted successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.use(verifyTokenAdmin);
router.get("/", UserController.index);
router.post("/", UserController.store);
router.get("/:id", UserController.show);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;