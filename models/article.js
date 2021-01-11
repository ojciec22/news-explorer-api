const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape
const test = /^(http(s)?:\/\/)?(www\.)?[\w-]+\.[\/()\w.:,-]+#?/;

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
      validator: (v) => test.test(v),
      message: 'Неправильная ссылка',
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => test.test(v),
      message: 'Неправильный адрес картинки',
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
