const authenticateService = require('../services/authenticateService');

class LoginController {
    async login(req, res) {
        const { user, token } = await authenticateService.login(req.body);
        if (user) {
            res.header('Authorization', `Bearer ${token}`);
            res.json(user);
        } else {
            res.status(400)
                .json({ message: 'Username or password is incorrect' });
        }
    }
}

module.exports.loginController = new LoginController();
