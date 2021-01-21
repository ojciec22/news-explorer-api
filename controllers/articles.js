const Article = require('../models/article');
const { NotFoundError, BadRequest, Forbidden } = require('../errors');
const { notFoundArticleId, noRigtsToDelete } = require('../constants/constants');

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
      if (err.statusCode === 'ValidationError') {
        next(new BadRequest(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    })
    .then((article) => res.send({
      data: {
        _id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      },
    }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => new NotFoundError(notFoundArticleId))
    .then((article) => {
      if (article.owner.toString() !== req.user._id.toString()) {
        throw new Forbidden(noRigtsToDelete);
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then(() => res.send({ data: article }));
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
