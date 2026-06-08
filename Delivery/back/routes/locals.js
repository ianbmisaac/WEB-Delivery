const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/localController');
const { authenticate } = require('../middlewares/auth');

router.get('/', ctrl.getAll);
router.get('/inactivos', authenticate, ctrl.getInactive);
router.get('/todas', authenticate, ctrl.getAllInactive);
router.get('/:id', ctrl.getById);
router.post('/', authenticate, ctrl.create);
router.put('/:id', authenticate, ctrl.update);
router.delete('/:id', authenticate, ctrl.remove);
router.patch('/:id/restore', authenticate, ctrl.restore);

module.exports = router;
