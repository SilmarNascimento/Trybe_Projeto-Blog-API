const { userService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const createUser = async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const { status, data } = await userService.createUser({ displayName, email, password, image });
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

const getAllUsers = async (_request, response) => {
  const { status, data } = await userService.getAllUsers();
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  const { status, data } = await userService.getUserById(id);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
