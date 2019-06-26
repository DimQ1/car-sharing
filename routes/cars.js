const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const { validators } = require('../services/cars');
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { carsController } = require('../controllers/index');

router.post('/', authorize(role.admin), expressJoiValidator(validators.create), carsController.create);
router.get('/', carsController.getAll);
router.get('/:carId', carsController.findById);
router.put('/:carId', authorize(role.admin), expressJoiValidator(validators.update), carsController.update);
router.delete('/:carId', authorize(role.admin), carsController.deleteById);
module.exports = router;
