const { Article } = require('../models/articles');
const { Category } = require('../models/categories');
const httpsStatus = require('http-status');
const { ApiError } = require('../middleware/apiError');

const addArticle = async (body) => {
    try {
        const article = new Article({
            ...body,
            score: parseInt(body.score)
        })
        await article.save();
        return article;

    } catch(err) {
        throw err
    }
}
const getArticleById = async (_id, user) => {
    try {
        const article = await Article.findById(_id).populate('category');
        if (!article) throw new ApiError(httpsStatus.NOT_FOUND, 'Article not found');
        if (user.role === 'user' && article.status === 'draft') {
            throw new ApiError(httpsStatus.NOT_FOUND, 'Draft can only be viewed by admins');
        }
        return article;
    } catch(err) {
        throw err
    }
}
//user not logged in
const getUsersArticleById = async (_id) => {
    try {
        const article = await Article.findById(_id).populate('category');
        if (!article) throw new ApiError(httpsStatus.NOT_FOUND, 'Article not found');
        if (article.status === 'draft') throw new ApiError(httpsStatus.NOT_FOUND, 'Draft cannot be viewed');
        return article;
    } catch(err) {
        throw err
    }
}
const updateArticleById = async (_id, body) => {
    try {
        const article = await Article.findOneAndUpdate(
            {_id},
            {"$set": body},     //should do some validation
            {new: true}
        );
        if (!article) throw new ApiError(httpsStatus.NOT_FOUND, 'Article does not exist');
        return article;

    } catch(err) {
        throw err
    }
}
const deleteArticleById = async (_id) => {
    try {
        // console.log(_id, 'in services.delete')
        const article = await Article.findByIdAndRemove(_id);
        if (!article) throw new ApiError(httpsStatus.NOT_FOUND, "Article not found, cannot delete");
        return true;
    } catch(err) {
        throw err
    }
}
const allArticles = async (req) => {
    const sortby = req.query.sortby || "_id";
    const order = req.query.order || "desc";
    const limit = req.query.limit || 2;
    try { 
        const articles = await Article
            .find({status:"public"})
            .populate('category')
            .sort([[sortby, order]])
            .limit(parseInt(limit));
        return articles;
    } catch(err) {
        throw err
    }
}
const moreArticles  = async (req) => {
    const sortby = req.body.sortby || "_id";
    const order = req.body.order || "desc";
    const limit = req.body.limit || 2;
    const skip = req.body.skip || 0;
    try { 
        const articles = await Article
            .find({status:"public"})
            .populate('category')
            .sort([[sortby, order]])
            .skip(skip)
            .limit(parseInt(limit));
        return articles;
    } catch(err) {
        throw err
    }
}
const paginateAdminArticles = async (req) => {
    try { 
        // let aggQuery = Article.aggregate();
        let aggQueryArray = [];

        if (req.body.keywords && req.body != '') {
            const re = new RegExp(`${req.body.keywords}`,'gi')
            // aggQuery = Article.aggregate([
            //     { $match: { title:{ $regex:re}}}
            // ]);
            aggQueryArray.push(
                { $match: { title:{ $regex:re}}}
            )

        // } else {
        //     aggQuery = Article.aggregate();
        }
        aggQueryArray.push(
            { $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "category"
                }
            },
            { $unwind: "$category"}
        )

        let aggQuery = Article.aggregate(aggQueryArray)
        const limit = req.body.limit ? req.body.limit : 5;
        const options = {
            page: req.body.page,
            limit,
            sort: { _id:"desc"}
        }
        const articles = await Article.aggregatePaginate(aggQuery, options)

        return articles;
    } catch(err) {
        throw err
    }
}
const addCategory = async(body) => {
    try {
        const category = new Category({
            ...body
        });
        await category.save();
        return category;
    } catch(err) {
        throw err
    }
}
const findAllCategories = async() => {
    try {
        const categories = await Category.find()
        return categories
    } catch(err) {
        throw err
    }
}

module.exports = {
    addArticle,
    getArticleById,
    getUsersArticleById,
    updateArticleById,
    deleteArticleById,
    allArticles,
    moreArticles,
    paginateAdminArticles,
    addCategory,
    findAllCategories
}