const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productController');
const { authenticate } = require('../middlewares/auth');

router.get('/local/:id', ctrl.getByLocal);
router.get('/:id', ctrl.getById);
router.post('/local/:id', authenticate, ctrl.create);
router.put('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
