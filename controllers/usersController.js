const { service } = require('../services/users');

class UserController {
    async getAll(req, res) {
        const users = await service.getAll();
        res.json(users);
    }

    async getById(req, res) {
        const user = await service.getById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }
}

module.exports = new UserController();
