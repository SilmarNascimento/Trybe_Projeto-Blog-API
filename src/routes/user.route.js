const route = require('express').Router();
const { userController } = require('../controller');
const { createUserInputValidation } = require('../middleware/inputValidation');

route.post('/', createUserInputValidation, userController.createUser);

module.exports = route;