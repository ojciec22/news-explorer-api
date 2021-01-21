const mongoose = require('mongoose');
const { linksTestValidation } = require('../constants/constants');
const { wrongLink, wrongLinkImg } = require('../constants/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linksTestValidation.test(v),
      message: wrongLink,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => linksTestValidation.test(v),
      message: wrongLinkImg,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },
});

const articleModel = mongoose.model('article', articleSchema);
module.exports = articleModel;
