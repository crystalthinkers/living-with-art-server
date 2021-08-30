const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category.controller');

router.post('/create', category_controller.student_create);
router.get('/:id', category_controller.student_details);
router.put('/:id/update', category_controller.student_update);
router.delete('/:id/delete', category_controller.student_delete);
module.exports = router;