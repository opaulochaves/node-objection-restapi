const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await controller.findUsers();

  res.json(users);
});

router.post('/', async (req, res) => {
  try {
    const user = await controller.createUser(req.body);

    delete user.password;
    return res.status(201).json(user);
  } catch (error) {
    if (error.name === 'UniqueViolationError') {
      return res.status(400).json({ error: 'email already in use' });
    }
    // TODO error handler, require objection errors, see objection example
    // TODO handle email check with model validation
    res.status(500).json({ error: 'something went wrong' });
  }
});

module.exports = router;
