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

const getPostsByQuery = async (request, response) => {
  const { q: query } = request.query;
  const { status, data } = await postService.getPostByQuery(query);
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const updatePostById = async (request, response) => {
  const { id } = request.params;
  const { title, content } = request.body;
  const postFound = request.post;
  const { status, data } = await postService.updatePostById(postFound, id, { title, content });
  if (status && data) {
    return response.status(mapStatus(status)).json(data);
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

const deletePostById = async (request, response) => {
  const { id } = request.params;
  const { status } = await postService.deletePostById(id);
  if (status === 'NO_CONTENT') {
    return response.status(mapStatus(status)).send();
  }
  return response.status(STATUS_ERROR).json(MESSAGE_ERROR);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByQuery,
  updatePostById,
  deletePostById,
};
