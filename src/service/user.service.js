const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'senhaSecreta';

const createUser = async ({ displayName, email, password, image }) => {
  const alreadyExists = await User.findOne({
    where: { email },
  });
  console.log(alreadyExists);
  if (alreadyExists) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  try {
    await User.create({ displayName, email, password, image });
    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return { status: 'CREATED', data: { token } };  
  } catch (error) {
    return { status: 'ERROR', data: { message: 'Internal Server Error' } };
  }
};

module.exports = {
  createUser,
};
