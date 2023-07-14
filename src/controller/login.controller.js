const { postService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const login = async (request, response) => {
  const { email, password } = request.body;
  const { status, data } = await postService.login(email, password);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = {
  login,
};