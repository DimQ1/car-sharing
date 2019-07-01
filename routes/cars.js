const { Router } = require('express');

const router = Router();
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { carsController } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.post('/', authorize(role.Admin), errorCatcher(carsController.create));
router.get('/', errorCatcher(carsController.getAll));
router.get('/fuellowLevel', errorCatcher((req, res) => carsController.foundFuelLevelLess(req, res)));
router.get('/:carId', errorCatcher(carsController.getById));
router.put('/:carId', authorize(role.Admin), errorCatcher(carsController.update));
router.delete('/:carId', authorize(role.Admin), errorCatcher(carsController.deleteById));

module.exports = router;
