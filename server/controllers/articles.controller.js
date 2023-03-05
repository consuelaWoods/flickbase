const httpsStatus = require('http-status');
const { Article } = require('../models/articles');
const { articlesService } = require('../services');

const articlesController = {
    async createArticle (req, res, next) {
        try {
            const article = await articlesService.addArticle(req.body)
            res.json(article);
        } catch(err) {
            next(err)
        }
    },
    async getArticleById (req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.getArticleById(_id, req.user)
            res.json(article);
        } catch(err) {
            next(err)
        }
    },
    async getUsersArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.getUsersArticleById(_id)
            res.json(article);
        } catch(err) {
            next(err)
        }
    },
    async updateArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            const article = await articlesService.updateArticleById(_id, req.body);

            res.json(article);
        } catch(err) {
            next(err)
        }
    },
    async deleteArticleById(req, res, next) {
        try {
            const _id = req.params.id;
            // console.log(_id, 'in controller.delete');
            await articlesService.deleteArticleById(_id);
            res.status(httpsStatus.OK).json({action:"deleted"});
        } catch(err) {
            next(err)
        }
    },
    async getAllArticles(req, res, next) {
        try {
            const articles = await articlesService.allArticles(req);
            res.json(articles)
        } catch(err) {
            next(err)
        }
    },
    async getMoreArticles(req, res, next) {
        try {
            const articles = await articlesService.moreArticles(req);
            res.json(articles)
        } catch(err) {
            next(err)
        }
    },
    async adminPaginate(req, res, next) {
        try {
            const articles = await articlesService.paginateAdminArticles(req);
            res.json(articles)
        } catch(err) {
            next(err)
        }
    },
    async createCategory(req, res, next) {
        try {
            const category = await articlesService.addCategory(req.body);
            res.json(category)
        } catch(err) {
            next(err)
        }
    },
    async getAllCategories(req, res, next) {
        try {
            const categories = await articlesService.findAllCategories()
            res.json(categories)            
        } catch(err) {
            next(err)
        }
    }
}



module.exports = articlesController;