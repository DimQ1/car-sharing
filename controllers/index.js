const users = require('./usersController');
const login = require('./loginController');
const { carController } = require('./carController');
const { carValidators } = require('./carController');

module.exports = {
    usersController: users,
    loginController: login,
    carController,
    carValidators
};
