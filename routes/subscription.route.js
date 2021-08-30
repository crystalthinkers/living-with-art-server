const express = require('express');
const router = express.Router();
const subscription_controller = require('../controllers/subscription.controller');

router.post('/create', subscription_controller.subscription_create);
router.get('/:id', subscription_controller.subscription_details);
router.put('/:id/update', subscription_controller.subscription_update);
router.delete('/:id/delete', subscription_controller.subscription_delete);
module.exports = router;