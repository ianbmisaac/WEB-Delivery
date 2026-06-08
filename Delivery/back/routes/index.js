'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Delivery v1' });
});

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
router.use('/locals', require('./locals'));
router.use('/orders', require('./orders'));
router.use('/products', require('./products'));
router.use('/upload', require('./upload'));

module.exports = router;
