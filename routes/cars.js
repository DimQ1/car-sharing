const { Router } = require('express');

const router = Router();
const expressJoiValidator = require('express-joi-validator');
const role = require('../common/role');
const authorize = require('../middlewares/authorize');
const { carController } = require('../controllers/index');
const { carValidators } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.post('/',
    expressJoiValidator(carValidators.newCar),
    authorize(role.Admin),
    errorCatcher(carController.create));

router.get('/',
    errorCatcher(carController.getAll));

router.get('/fuellowLevel/:level',
    errorCatcher((req, res) => carController.findFuelLevelLess(req, res)));

router.get('/unauthorizedDriverCard',
    errorCatcher((req, res) => carController.findUnautorazedCard(req, res)));

router.get('/:carId',
    errorCatcher(carController.getById));

router.patch('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carController.patch));

router.put('/:carId',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carController.updateById));

router.delete('/:carId',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carController.deleteById));

router.delete('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carController.deleteBy));

module.exports = router;
