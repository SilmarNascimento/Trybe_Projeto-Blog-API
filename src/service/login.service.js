const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'senhaSecreta';
console.log(secret);

const login = async (email, password) => {
  const userFound = await User.findOne({
    where: { email, password },
  });
  if (!userFound) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }
  const jwtConfig = { algorithm: 'HS256' };
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return { status: 'SUCCESSFUL', data: { token } };
};

module.exports = {
  login,
};
