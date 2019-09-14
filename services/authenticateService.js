const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');
const usersRepository = require('../dataAccess/usersRepository');

class Authenticate {
    constructor() {
        this._getUserWithoutPassword = (user) => {
            const {
                // eslint-disable-next-line no-unused-vars
                password, _id, __v, ...userWithoutPassword
            } = user.toObject({ virtuals: true });

            return userWithoutPassword;
        };
    }

    async login({ login, password }) {
        const user = await usersRepository.findByName(login);
        if (!user) {
            throw new Error(`login "${login}" is incorrect`);
        }
        const isPasswordCorrect = await bcrypt.compare(password, user ? user.password : '');
        if (isPasswordCorrect) {
            const token = jwt.sign({ sub: user.id, role: user.role }, secret);
            const userWithoutPassword = this._getUserWithoutPassword(user);

            return { user: userWithoutPassword, token };
        }

        throw new Error('incorrect password');
    }
}

module.exports = new Authenticate();
