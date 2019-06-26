const { Router } = require('express');

const router = Router();
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { usersController } = require('../controllers/index');

router.get('/', authorize(role.admin), usersController.getAll);
router.get('/:id', usersController.getById);
module.exports = router;
