const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET || 'senhaSecreta';
const ERROR_RESPONSE = { status: 'ERROR', data: { message: 'Internal Server Error' } };

const createUser = async ({ displayName, email, password, image }) => {
  const alreadyExists = await User.findOne({
    where: { email },
  });
  if (alreadyExists) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }
  try {
    await User.create({ displayName, email, password, image });
    const jwtConfig = { algorithm: 'HS256' };
    const token = jwt.sign({ data: { email } }, secret, jwtConfig);
    return { status: 'CREATED', data: { token } };  
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    const filteredUsers = users.map((user) => {
      const { id, displayName, email, image } = user;
      return { id, displayName, email, image };
    });
    return { status: 'SUCCESSFUL', data: filteredUsers };
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

const getUserById = async (userId) => {
  try {
    const userFound = await User.findOne({
      where: { id: userId },
    });
    if (!userFound) {
      return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
    }
    const { id, displayName, email, image } = userFound;
    const filteredUsers = { id, displayName, email, image };
    return { status: 'SUCCESSFUL', data: filteredUsers };
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

const deleteMe = async (userId) => {
  try {
    await User.destroy({
      where: { id: userId },
    });
    return { status: 'NO_CONTENT' };
  } catch (error) {
    return ERROR_RESPONSE;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteMe,
};
