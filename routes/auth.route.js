const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth.controller');

router.post('/Registration', auth_controller.auth_create);
router.post('/otp-verification', auth_controller.auth_verification);
router.post('/login', auth_controller.login);
module.exports = router;