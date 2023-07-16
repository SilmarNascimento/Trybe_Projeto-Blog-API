const { postService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const createPost = async (request, response) => {
  console.log('entrei createPost');
  const { title, content, categoryIds } = request.body;
  const { id: userId } = request.user;
  const idNotFound = await postService.findAllCategoryIds(categoryIds);
  if (idNotFound) {
    return response.status(mapStatus(idNotFound.status)).json(idNotFound.data);
  }
  const { status, data } = await postService.createPost({ title, content, userId }, categoryIds);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

const getAllPosts = async (_request, response) => {
  console.log('entrei getAllPosts');
  const { status, data } = await postService.getAllPosts();
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(500).json({
    message: 'Internal Server Error',
  });
};

module.exports = {
  createPost,
  getAllPosts,
};
