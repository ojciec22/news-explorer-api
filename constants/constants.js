const notFoundData = 'Скорее всего данные уже были удалены ранее';
const notFoundArticleId = 'Статья с таким id не найдена';
const noRigtsToDelete = 'Нет прав на удаление статьи';
const noUser = 'Пользователь не обнаружен';
const userEmailAlredyRegister = 'Пользователь с таким email уже зарегистрирован';
const unauthorized = 'Ошибка авторизации';
const wrongLink = 'Неправильная ссылка';
const wrongLinkImg = 'Неправильный адрес картинки';
const wrongMailOrPassword = 'Неправильные почта или пароль';
const wrongEmail = 'Неправильный адрес e-mail';
const serverDown = 'Сервер сейчас упадёт';

const linksTestValidation = /^(http(s)?:\/\/)?(www\.)?[\w-]+\.[/()\w.:,-]+#?/;

module.exports = {
  notFoundData,
  notFoundArticleId,
  noRigtsToDelete,
  noUser,
  userEmailAlredyRegister,
  unauthorized,
  wrongLink,
  wrongLinkImg,
  wrongMailOrPassword,
  serverDown,
  linksTestValidation,
  wrongEmail,
};
