'use strict';
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Delivery v1' });
});

module.exports = router;
