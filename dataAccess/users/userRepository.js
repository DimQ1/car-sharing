const BaseRepository = require('../baseRepository');
const User = require('../models/user');

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findByName(name) {
        const user = await super.findOne({ login: name });

        return user;
    }
}
exports.UserRepository = new UserRepository();
