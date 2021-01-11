const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line no-useless-escape
const test = /^(http(s)?:\/\/)?(www\.)?[\w-]+\.[\/()\w.:,-]+#?/;

const {
  getArticles, createArticle, deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(test),
    image: Joi.string().required().regex(test), // .uri(),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required(),
  }),
}), deleteArticle);

module.exports = router;
