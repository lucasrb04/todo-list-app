const jwt = require('jsonwebtoken');
require('dotenv').config();
const httpStatus = require('http-status');

const { userModel } = require('../models');

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */
   const secret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */

  const token = req.headers.authorization;
  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'O token é obrigatório.' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const { userId, user } = decoded;
    const registeredUser = await userModel.findByUser(user);

    if (!registeredUser) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token expirado.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.body.userInfo = { user, userId };
    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED)
      .json({ message: 'O token não é válido.', error: err.message });
  }
};