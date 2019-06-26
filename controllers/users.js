const { service } = require('../services/users');

class UsersController {
    getAll(req, res, next) {
        service.getAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }

    getById(req, res, next) {
        service.getById(req.params.id)
            .then(user => user ? res.json(user) : res.sendStatus(404))
            .catch(err => next(err));
    }
}

module.exports = new UsersController();
