const users = require('../dataAccess/usersRepository');
const { NotFoundContentError: NotFoundError } = require('../common/types/errorTypes');

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
        const allUsers = await users.getAll({});
        if (!allUsers) {
            throw new Error('not found');
        }
        const allUsersWithoutPasswords = allUsers.map(user => this._getUserWithoutPassword(user));

        return allUsersWithoutPasswords;
    }

    async getById(id) {
        const user = await users.findById(id);
        if (!user) {
            return null;
        }

        return this._getUserWithoutPassword(user);
    }

    async create(user) {
        return this._getUserWithoutPassword(await users.create(user));
    }
}

module.exports = new UserService();
