const { Post, PostCategory, Category } = require('../models');
const slug = require("slug");
const postcategory = require('../models/postcategory');
const category = require('../models/category');


class postController {
    async index(req, res) {
        try {
            const post = await Post.findAll({
                include: 'categories'
            });
            return res.json({
                code: 200,
                message: `${post.length} sudah diterima`,
                count: post.length,
                data: post
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async store(req, res) {
        try {
            const { title, description, categoryId, status } = req.body;
            console.log(categoryId);
            const post = await Post.create({
                title: title,
                description: description,
                categoryId: categoryId,
                status: status,
                slug: slug(title)
            });
            for (let x of categoryId) {
                try {
                    await PostCategory.create({
                        postId: post.id,
                        categoryId: x
                    });
                } catch (error) {
                    return res.json({ message: error.message });
                }
            }
            return res.json({
                code: 201,
                message: "Data berhasil dibuat!",
                data: post
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
            const post = await Post.findByPk(id, {
                include: 'categories'
            });
            if (!post) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            return res.json({
                code: 200,
                message: "Data sudah diterima!",
                data: post
            });
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }
    async getBySlug(req, res) {
        try {
            const { slug } = req.params;
            const post = await Post.findOne({
                where: {
                    slug: slug
                },
                include: 'categories'
            });
            if (!post) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            return res.json({
                code: 200,
                message: "Data sudah diterima!",
                data: post
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
            const { title, description, categoryId, status } = req.body;
            const post = await Post.findByPk(id);
            if (!post) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            post.update({
                title: title,
                description: description,
                status: status,
                slug: slug(title)
            });
            // Retrieve existing post-categories associated with the post
            const postCategories = await PostCategory.findAll({
                where: {
                    postId: post.id
                }
            });

            const existingCategoryIds = postCategories.map(category => category.categoryId);
            const categoriesToRemove = postCategories.filter(category => !categoryId.includes(category.categoryId));

            await Promise.all(categoriesToRemove.map(category => category.destroy()));
            const categoriesToAdd = categoryId.filter(categoryId => !existingCategoryIds.includes(categoryId));

            await Promise.all(categoriesToAdd.map(categoryId => PostCategory.create({
                postId: post.id,
                categoryId: categoryId
            })));
            return res.json({
                code: 200,
                message: "Data berhasil diperbarui!",
                data: post
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
            const post = await Post.findByPk(id);
            if (!post) {
                return res.json({
                    code: 400,
                    message: "Data tidak ditemukan!"
                });
            }
            await PostCategory.destroy({
                where: {
                    postId: post.id
                }
            });
            post.destroy();
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

module.exports = new postController();