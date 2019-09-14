const mongoose = require('mongoose');
const { connectionString } = require('../config');

function connect() {
    mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports.connect = connect;
