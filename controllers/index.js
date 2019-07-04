const { userController } = require('./userController');
const { loginController } = require('./loginController');
const { loginValidators } = require('./loginController');
const { carController } = require('./carController');
const { carValidators } = require('./carController');

module.exports = {
    userController,
    loginController,
    loginValidators,
    carController,
    carValidators
};
