const route = require('express').Router();
const { postController } = require('../controller');
const tokenValidation = require('../middleware/tokenValidation');

route.post('/', tokenValidation, postController.createPost);

module.exports = route;