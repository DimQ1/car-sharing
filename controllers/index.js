const { userController } = require('./userController');
const { loginController } = require('./loginController');
const { carController } = require('./carController');
const loginValidators = require('./validators/loginValidators');
const carValidators = require('./validators/carValidators');

module.exports = {
    userController,
    loginController,
    loginValidators,
    carController,
    carValidators
};
