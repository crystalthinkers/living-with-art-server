const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth.controller');

router.post('/Registration',auth_controller.auth_create);
router.get('/sendMessage',[auth_controller.verify_token],auth_controller.send_message);
router.post('/otp-verification', auth_controller.auth_verification);
router.post('/login', auth_controller.login);
router.post('/check-message', auth_controller.checkMessage);
module.exports = router;

// const { Client } = require('whatsapp-web.js');
// const client = new Client();

// client.on('qr', (qr) => {
//     console.log('QR RECEIVED222', qr);
// });

// client.on('ready', () => {
//     console.log('Client is ready!');
// });

// client.initialize();