const { services } = require('../services/authenticate');

class LoginController {
    async authenticate(req, res, next) {
        const user = await services.authenticate(req.body);
        if (user) {
            return res.json(user);
        }

        return res.status(400)
            .json({ message: 'Username or password is incorrect' });
    }
}

module.exports = new LoginController();
