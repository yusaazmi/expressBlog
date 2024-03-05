const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class authController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                email
            });
            if (!user) {
                return res.status(401).json({
                    message: "User tidak ditemukan!"
                });
            }
            const checkPassword = bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res.status(401).json({
                    message: "Email atau Password salah!"
                });
            }
            const token = jwt.sign({ userId: user.id, role: user.role }, 'shhhhh', {
                expiresIn: '3600000',
            });
            const decodedToken = jwt.decode(token);
            const expiresIn = decodedToken.exp;
            res.status(200).json({
                code: 200,
                message: "Berhasil masuk!",
                accessToken: token,
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
}

module.exports = new authController();