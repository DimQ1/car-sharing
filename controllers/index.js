const users = require('./users');
const login = require('./login');
const cars = require('./cars');

module.exports = {
    usersController: users,
    loginController: login,
    carsController: cars
};
