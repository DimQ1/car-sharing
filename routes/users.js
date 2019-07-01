const { Router } = require('express');

const router = Router();
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { usersController } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.get('/', errorCatcher(authorize(role.Admin)), errorCatcher(usersController.getAll));
router.get('/:id', errorCatcher(usersController.getById));
module.exports = router;
