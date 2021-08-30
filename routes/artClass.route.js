const express = require('express');
const router = express.Router();
const artClass_controller = require('../controllers/artClass.controller');

router.post('/create', artClass_controller.artclass_create);
router.get('/:id', artClass_controller.artclass_details);
router.put('/:id/update', artClass_controller.artclass_details);
router.delete('/:id/delete', artClass_controller.artclass_delete);
module.exports = router;