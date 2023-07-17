const route = require('express').Router();
const { postController } = require('../controller');
const {
  createPostInputValidation,
  updatePostInputValidation,
} = require('../middleware/inputValidation');
const postValidation = require('../middleware/postValidation');
const tokenValidation = require('../middleware/tokenValidation');

const deleteMiddleware = [tokenValidation, postValidation, updatePostInputValidation];

route.post('/', tokenValidation, createPostInputValidation, postController.createPost);
route.get('/', tokenValidation, postController.getAllPosts);
route.get('/search', tokenValidation, postController.getPostsByQuery);
route.get('/:id', tokenValidation, postController.getPostById);
route.put('/:id', deleteMiddleware, postController.updatePostById);
route.delete('/:id', tokenValidation, postValidation, postController.deletePostById);

module.exports = route;