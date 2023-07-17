const route = require('express').Router();
const { postController } = require('../controller');
const {
  createPostInputValidation,
  updatePostInputValidation,
} = require('../middleware/inputValidation');
const postValidation = require('../middleware/postValidation');
const tokenValidation = require('../middleware/tokenValidation');

route.post('/', tokenValidation, createPostInputValidation, postController.createPost);
route.get('/', tokenValidation, postController.getAllPosts);
route.get('/:id', tokenValidation, postController.getPostById);
route.put(
  '/:id',
  tokenValidation,
  postValidation,
  updatePostInputValidation,
  postController.updatePostById,
);
route.delete('/:id', tokenValidation, postValidation, postController.deletePostById);

module.exports = route;