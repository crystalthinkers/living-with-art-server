const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category.controller');
const auth_controller = require('../controllers/auth.controller');

// router.post('/create',[auth_controller.authenticateToken],category_controller.category_create);
router.get('/all', category_controller.allCategories);
router.post('/create',category_controller.category_create);
router.get('/:id', category_controller.category_details);
router.put('/:id/update', category_controller.category_update);
router.delete('/:id/delete', category_controller.category_delete);
module.exports = router;