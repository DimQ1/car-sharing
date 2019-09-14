const userService = require('../services/usersService');

class UserController {
    async getAll(req, res) {
        const users = await userService.getAll();
        res.json(users);
    }

    async getById(req, res) {
        const user = await userService.getById(req.params.userId);
        if (user) {
            res.json(user);
        } else {
            res.status(400)
                .json({ message: 'User not found!' });
        }
    }
}

module.exports.userController = new UserController();
