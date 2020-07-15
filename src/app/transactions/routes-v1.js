const express = require('express');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.json({ text: 'transactions' });
});

module.exports = router;
