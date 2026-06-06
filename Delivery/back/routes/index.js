'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Delivery v1' });
});

router.use('/users', require('./users'));
router.use('/restaurants', require('./restaurants'));
router.use('/orders', require('./orders'));

module.exports = router;
