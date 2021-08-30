const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category.controller');

router.post('/create', category_controller.cateegory_create);
router.get('/:id', category_controller.category_details);
router.put('/:id/update', category_controller.category_update);
router.delete('/:id/delete', category_controller.category_delete);
module.exports = router;