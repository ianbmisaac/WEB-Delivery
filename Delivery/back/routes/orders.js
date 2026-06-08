const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/orderController');
const { authenticate } = require('../middlewares/auth');

router.get('/', authenticate, ctrl.getAll);
router.get('/active', authenticate, ctrl.getActive);
router.get('/:id', authenticate, ctrl.getById);
router.post('/', authenticate, ctrl.create);
router.patch('/:id/status', authenticate, ctrl.updateStatus);
router.delete('/:id', authenticate, ctrl.remove);

module.exports = router;
