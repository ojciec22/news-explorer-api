const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linksTestValidation } = require('../constants/constants');

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
    link: Joi.string().required().regex(linksTestValidation),
    image: Joi.string().required().regex(linksTestValidation),
  }),
}), createArticle);

router.delete('/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
}), deleteArticle);

module.exports = router;
