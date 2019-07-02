const { Router } = require('express');

const router = Router();
const { role } = require('../middlewares/authorize');
const { authorize } = require('../middlewares/authorize');
const { carsController } = require('../controllers/index');
const errorCatcher = require('../common/errorCatcher');

router.post('/',
    authorize(role.Admin),
    errorCatcher(carsController.create));

router.get('/',
    errorCatcher(carsController.getAll));

router.get('/fuellowLevel',
    errorCatcher((req, res) => carsController.findFuelLevelLess(req, res)));

router.get('/unauthorizedDriverCard',
    errorCatcher((req, res) => carsController.findUnautorazedCard(req, res)));

router.get('/:carId',
    errorCatcher(carsController.getById));

router.patch('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carsController.patch));

router.put('/:carId',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carsController.updateById));

router.delete('/:carId',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carsController.deleteById));

router.delete('/',
    errorCatcher(authorize(role.Admin)),
    errorCatcher(carsController.deleteBy));

module.exports = router;
