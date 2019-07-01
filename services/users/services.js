const users = require('../../dataAccess/users');

class UserService {
    constructor() {
        this._getUserWithoutPassword = (user) => {
            const {
                // eslint-disable-next-line no-unused-vars
                password, _id, __v, ...userWithoutPassword
            } = user.toObject({ virtuals: true });

            return userWithoutPassword;
        };
    }

    async getAll() {
        const allUsers = await users.getAll();
        const allUsersWithoutPasswords = allUsers.map(user => this._getUserWithoutPassword(user));

        return allUsersWithoutPasswords;
    }

    getById(id) {
        return this._getUserWithoutPassword(users.findById(id));
    }

    create(user) {
        return this._getUserWithoutPassword(users.create(user));
    }
}

module.exports = new UserService();
