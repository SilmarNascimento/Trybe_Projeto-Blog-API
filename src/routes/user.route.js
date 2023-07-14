const route = require('express').Router();
const { userController } = require('../controller');
const { createUserInputValidation } = require('../middleware/inputValidation');
const tokenValidation = require('../middleware/tokenValidation');

route.post('/', createUserInputValidation, userController.createUser);
route.get('/', tokenValidation, userController.getAllUsers);
route.get('/:id', tokenValidation, userController.getUserById);

module.exports = route;