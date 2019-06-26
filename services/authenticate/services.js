const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config');
const users = require('../../dataAccess/users');

class Authenticate {
    constructor() {
        this._getUserWithoutPassword = (user) => {
            // eslint-disable-next-line no-unused-vars
            const { password, ...userWithoutPassword } = user;

            return userWithoutPassword;
        };
    }

    async authenticate({ userName, password }) {
        const user = await users.getByName(userName);
        const isPasswordCorrect = bcrypt.compareSync(password, user ? user.password : '');
        if (isPasswordCorrect) {
            const token = jwt.sign({ sub: user.id, role: user.role }, secret);
            const userWithoutPassword = this._getUserWithoutPassword(user);

            return { ...userWithoutPassword, token };
        }

        return null;
    }
}

module.exports = new Authenticate();