const route = require('express').Router();
const { loginController } = require('../controller');
const { loginValidation } = require('../middleware/inputValidation');

route.post('/', loginValidation, loginController.login);

module.exports = route;