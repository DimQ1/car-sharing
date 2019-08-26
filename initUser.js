const mongoose = require('mongoose');

const usersService = require('./dataAccess/usersRepository');

const mongoDB = 'mongodb://localhost/car-sharing';
mongoose.connect(mongoDB, { useNewUrlParser: true, useCreateIndex: true });

usersService.create({
    login: 'admin',
    password: '$2a$10$JkRYXk6Wav5J3OIjnGt54.mUGKb.n4w3a6.s2YazxBZ3xeIPPs0Gy',
    firstName: 'admin',
    lastName: 'User',
    role: 'Admin'

});
