const { Router } = require('express');

const router = Router();
const { loginController } = require('../controllers/index');

router.post('/', loginController.authenticate);
module.exports = router;
