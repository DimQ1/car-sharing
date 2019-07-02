const { Router } = require('express');

const router = Router();
const { loginController } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.post('/',
    errorCatcher(loginController.login));
module.exports = router;
