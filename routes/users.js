const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUser,
} = require('../controllers/users');

router.get('/users/me', getUser);

module.exports = router;
