const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const tokenValidation = async (request, response, next) => {
  try {
  const bearerToken = request.header('Authorization');
  if (!bearerToken) {
    return response.status(401).json({ error: 'Token não encontrado' });
  }
  const token = bearerToken.split(' ')[1];
  const decoded = jwt.verify(token, secret);
  const user = await User.findOne({
    where: { email: decoded.data.email },
  });
  if (!user) {
    return response.status(401).json({ message: 'Erro ao procurar o usuário do token' });
  }
  request.user = user;  
  next();
  } catch (error) {
    return response.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = tokenValidation;