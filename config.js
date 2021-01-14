const DB = 'mongodb://localhost:27017/newsdb';
const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  JWT_SECRET,
  DB,
  NODE_ENV,
};
