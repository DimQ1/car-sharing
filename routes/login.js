const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const { loginController } = require('../controllers/index');
const { loginValidators } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.post('/',
    expressJoiValidator(loginValidators.login),
    errorCatcher(loginController.login));
module.exports = router;
