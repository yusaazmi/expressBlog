const { User } = require('../models');
const bcrypt = require('bcrypt');

class userController {
    async index(req, res) {
        try {
            const user = await User.findAll();
            return res.json({
                code: 200,
                message: `${user.length} data sudah diterima`,
                count: user.length,
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async store(req, res) {
        try {
            const { fullName, email, password, role, avatar, status } = req.body;
            const user = await User.create({
                fullName: fullName,
                email: email,
                password: bcrypt.hashSync(password, 10),
                role: role,
                avatar: avatar,
                status: status
            });

            return res.json({
                code: 201,
                message: "Data berhasil dibuat!",
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(401).json({
                    code: 401,
                    message: "User tidak ditemukan"
                });
            }
            return res.status(200).json({
                code: 200,
                message: "Data sudah diterima",
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const { fullName, email, password, role, status } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            user.update({
                fullName: fullName,
                email: email,
                password: bcrypt.hashSync(password, 10),
                role: role,
                status: status
            });
            return res.json({
                code: 200,
                message: "Data berhasil diperbarui!",
                data: user
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            user.destroy();
            return res.json({
                code: 200,
                message: "Data berhasil dihapus!"
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
}

module.exports = new userController();