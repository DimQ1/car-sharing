const { Router } = require('express');

const router = Router();
const users = require('./users');
const login = require('./login');
const cars = require('./cars');


router.use('/users', users);
router.use('/login', login);
router.use('/cars', cars);

module.exports = router;
