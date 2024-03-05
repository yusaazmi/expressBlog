const { Category } = require('../models');


class categoryController {
    async index(req, res) {
        try {
            const category = await Category.findAll();
            return res.json({
                code: 200,
                message: `${category.length} sudah diterima`,
                count: category.length,
                data: category
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async store(req, res) {
        try {
            const { title } = req.body;
            const category = await Category.create({
                title: title
            });
            return res.json({
                code: 201,
                message: "Data berhasil dibuat!",
                data: category
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
            const category = await Category.findByPk(id);
            if (!category) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            return res.json({
                code: 200,
                message: "Data sudah diterima!",
                data: category
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
            const { title } = req.body;
            const category = await Category.findByPk(id);
            if (!category) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            category.update({
                title: title
            });
            return res.json({
                code: 200,
                message: "Data berhasil diperbarui!",
                data: category
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
            const category = await Category.findByPk(id);
            if (!category) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            category.destroy();
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

module.exports = new categoryController();