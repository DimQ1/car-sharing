const users = require('./usersController');
const login = require('./loginController');
const cars = require('./carController');

module.exports = {
    usersController: users,
    loginController: login,
    carsController: cars
};
