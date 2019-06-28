const { cruid } = require('../repository');
const User = require('../../models/user');

class UserRepository {
    async create(user) {
        const newUser = await cruid.create(new User(user));

        return newUser;
    }

    async getAll() {
        const users = await cruid.getAll(User);

        return users;
    }

    async getByName(name) {
        const user = await cruid.findOne(User, { userName: name });

        return user;
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            try {
                const user = cruid.find(userItem => userItem.id === parseInt(id, 10));
                resolve(user);
            } catch (error) {
                reject(error);
            }
        });
    }
}

exports.UserRepository = new UserRepository();
