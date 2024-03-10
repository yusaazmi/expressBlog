const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController.js");

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication API
 * /v1/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: User Login
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string              
 *     responses:
 *       200:
 *         description: Berhasil masuk!
 *       400:
 *         description: Email atau password salah!
 *       401:
 *         description: User tidak ditemukan!
 *       500:
 *         description: Internal Server Error
* /v1/auth/refresh-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Get Refresh Token
 *     description: Get Refresh Token.
 *     requestBody:
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      refreshToken:
 *                          type: string
 *     responses:
 *       '200':
 *         description: Success
 *       '404':
 *         description: Error
 *       '500':
 *         description: Internal Server Error
 */

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);


module.exports = router;