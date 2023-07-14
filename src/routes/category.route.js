const route = require('express').Router();
const { categoryController } = require('../controller');
const { createCategoryInputValidation } = require('../middleware/inputValidation');
const tokenValidation = require('../middleware/tokenValidation');

route.post('/', createCategoryInputValidation, tokenValidation, categoryController.createCategory);

module.exports = route;