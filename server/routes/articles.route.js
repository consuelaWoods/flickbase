const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles.controller');

const auth = require('../middleware/auth');
const { route } = require('./user.route');

// .../api/articles/
router.post('/', auth('createAny', 'articles'), articlesController.createArticle);

//admin
router.route('/article/:id')
    .get(auth('readAny',"articles"), articlesController.getArticleById)
    .patch(auth('updateAny', 'articles'), articlesController.updateArticleById)
    .delete(auth('deleteAny','articles'), articlesController.deleteArticleById)

router.post('/admin/paginate', auth('readAny','articles'), articlesController.adminPaginate)

//not logged in users
router.route('/users/article/:id')
    .get(articlesController.getUsersArticleById)
router.route('/all')
    .get(articlesController.getAllArticles)
    .post(articlesController.getMoreArticles)
module.exports = router;