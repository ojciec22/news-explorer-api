const DB = 'mongodb://localhost:27017/newsdb';
const { JWT_SECRET = 'JWT_SECRET' } = process.env;

module.exports = {
  JWT_SECRET,
  DB,
};
