const { Router } = require('express');

const router = Router();
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { carsController } = require('../controllers/index');

router.post('/', authorize(role.admin), carsController.create);
router.get('/', carsController.getAll);
router.get('/:carId', carsController.getById);
router.put('/:carId', authorize(role.admin), carsController.update);
router.delete('/:carId', authorize(role.admin), carsController.deleteById);
module.exports = router;
