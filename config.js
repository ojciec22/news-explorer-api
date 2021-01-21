const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;
const DB = 'mongodb://localhost:27017/newsdb';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DB,
};
