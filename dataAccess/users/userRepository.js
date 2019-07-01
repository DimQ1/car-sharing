const BaseRepository = require('../baseRepository');
const User = require('../models/user');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByName(name) {
        const user = await super.findOne(User, { userName: name });

        return user;
    }
}
exports.UserRepository = new UserRepository();
