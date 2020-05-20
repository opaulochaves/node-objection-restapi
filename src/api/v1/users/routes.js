const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await controller.findUsers();

  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await controller.createUser(req.body);

  delete user.password;
  res.json(user);
});

module.exports = router;
