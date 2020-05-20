const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await controller.findUsers();

  res.json(users);
});

module.exports = router;
