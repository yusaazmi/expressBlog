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
            const { fullName, email, password, role, avatar } = req.body;
            console.log(role);
            const user = await User.create({
                fullName: fullName,
                email: email,
                password: bcrypt.hashSync(password, 10),
                role: role,
                avatar: avatar,
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
}

module.exports = new userController();