const Article = require('../models/article');
const { NotFoundError, BadRequest, Forbidden } = require('../errors');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError('Скорее всего данные уже были удалены ранее'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id.toString()) {
        throw new Forbidden('Нет прав на удаление статьи');
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then(() => res.send({ data: article }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
