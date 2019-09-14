const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    login: {
        type: String,
        unique: true,
        dropDups: true
    },
    password: String,
    firstName: String,
    lastName: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);
