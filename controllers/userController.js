const { userService } = require('../services/usersService');

class UserController {
    async getAll(req, res) {
        const users = await userService.getAll();
        res.json(users);
    }

    async getById(req, res) {
        const user = await userService.getById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports.userController = new UserController();