const { categoryService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const createCategory = async (request, response) => {
  const { name } = request.body;
  const { status, data } = await categoryService.createCategory(name);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

const getAllCategories = async (_request, response) => {
  const { status, data } = await categoryService.gatAllCategories();
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = {
  createCategory,
  getAllCategories,
};