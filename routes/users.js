const { Router } = require('express');

const router = Router();
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const { userController } = require('../controllers');
const errorCatcher = require('../common/errorCatcher');

router.get('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(userController.getAll));

router.get('/:id',
    errorCatcher(userController.getById));
module.exports = router;
