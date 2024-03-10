const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


class authController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            if (!user) {
                return res.status(401).json({
                    message: "User tidak ditemukan!"
                });
            }
            const checkPassword = bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.status(400).json({
                    message: "Email atau Password salah!"
                });
            }
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, {
                expiresIn: '360000',
            });
            const refreshToken = jwt.sign({ userId: user.id, role: user.role }, process.env.REFRESH_SECRET_KEY);
            const decodedToken = jwt.decode(token);
            const expiresIn = decodedToken.exp;
            res.status(200).json({
                code: 200,
                message: "Berhasil masuk!",
                accessToken: token,
                refreshToken: refreshToken,
                expiresIn: expiresIn,
                tokenType: "Bearer",
                user: user
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
    async getMyProfile(req, res) {
        try {
            console.log(req.user)
            const user = await User.findByPk(req.user.userId, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async refreshToken(req, res) {
        const refreshToken = req.body.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token is required."
            });
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid refresh token."
                });
            }

            const userId = decoded.userId;
            const userRole = decoded.role;
            const accessToken = jwt.sign({ userId, role: userRole }, process.env.SECRET_KEY, {
                expiresIn: '360000',
            });

            res.json({
                accessToken: accessToken
            });
        });
    }
}

module.exports = new authController();