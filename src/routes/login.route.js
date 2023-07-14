const route = require('express').Router();
const { loginController } = require('../controller');
const { loginInputValidation } = require('../middleware/inputValidation');

route.post('/', loginInputValidation, loginController.login);

module.exports = route;