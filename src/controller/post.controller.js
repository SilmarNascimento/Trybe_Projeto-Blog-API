const { postService } = require('../service');
const { mapStatus } = require('../utils/mapStatus');

const STATUS_ERROR = 500;
const MESSAGE_ERROR = { message: 'Internal Server Error' };

const createPost = async (request, response) => {
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
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const getAllPosts = async (_request, response) => {
  const { status, data } = await postService.getAllPosts();
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const getPostById = async (request, response) => {
  const { id } = request.params;
  const { status, data } = await postService.getPostById(id);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const updatePostById = async (request, response) => {
  const { id } = request.params;
  const { id: tokenUserId } = request.user;
  const { title, content } = request.body;
  const { status, data } = await postService.updatePostById(tokenUserId, id, { title, content });
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const deletePostById = async (request, response) => {
  const { id } = request.params;
  const { id: tokenUserId } = request.user;
  const { status, data } = await postService.deletePostById(tokenUserId, id);
  if (status && data) {
    return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
  }
  return response.status(mapStatus(status));
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
