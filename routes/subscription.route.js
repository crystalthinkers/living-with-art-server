const express = require('express');
const router = express.Router();
const subscription_controller = require('../controllers/subscription.controller');

router.post("/create", subController.subscription_create);
router.get("/:id", subController.subscription_details);
router.put("/:id/update", subController.subscription_update);
router.delete("/:id/delete", subController.subscription_delete);
router.post("/verification", subController.subscription_verification);
router.post("/payment", subController.subscription_payment);
module.exports = router;