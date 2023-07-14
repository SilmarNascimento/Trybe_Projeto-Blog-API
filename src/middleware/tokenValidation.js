const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const tokenValidation = async (request, response, next) => {
  try {
    const bearerToken = request.header('Authorization');
    if (!bearerToken) {
      return response.status(401).json({ message: 'Token not found' });
    }
    const token = bearerToken.split(' ')[1] || bearerToken;
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({
      where: { email: decoded.data.email },
    });
    if (!user) {
      return response.status(401).json({ message: 'Erro ao procurar o usuário do token' });
    }
    request.user = { id: user.id };  
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;