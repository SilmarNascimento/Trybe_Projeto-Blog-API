const route = require('express').Router();
const { postController } = require('../controller');
const { createPostInputValidation } = require('../middleware/inputValidation');
const tokenValidation = require('../middleware/tokenValidation');

route.post('/', tokenValidation, createPostInputValidation, postController.createPost);
route.get('/', tokenValidation, postController.getAllPosts);

module.exports = route;