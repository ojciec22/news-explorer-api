const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Ошибка авторизации!');
  }

  const token = authorization.replace('Bearer ', '');
  // const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
  } catch (err) {
    next(new Unauthorized({ message: 'Ошибка авторизации' }));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
