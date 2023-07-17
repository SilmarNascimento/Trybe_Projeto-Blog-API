const { userService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const STATUS_ERROR = 500;
const MESSAGE_ERROR = { message: 'Internal Server Error' };

const createUser = async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const { status, data } = await userService.createUser({ displayName, email, password, image });
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const getAllUsers = async (_request, response) => {
  const { status, data } = await userService.getAllUsers();
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  const { status, data } = await userService.getUserById(id);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const deleteMe = async (request, response) => {
  try {
  const { id: userId } = request.user;
  const { status } = await userService.deleteMe(userId);
  if (status === 'NO_CONTENT') {
    return response.status(mapStatus(status)).send();
  }
  } catch (error) {
    return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteMe,
};
