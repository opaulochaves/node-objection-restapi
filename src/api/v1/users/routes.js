const omit = require('lodash/omit');
const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (_req, res) => {
  const users = await controller.findUsers();

  res.json(users);
});

router.post('/', async (req, res, next) => {
  try {
    const user = await controller.createUser(req.body);

    delete user.password;
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const user = await controller.updateUser(req.params.id, req.body);

    res.json(omit(user, 'password'));
  } catch (error) {
    next(error);
  }
});

router.post('/:id/resetPassword', async (req, res, next) => {
  try {
    const ok = await controller.resetPassword(req.params.id, req.body);

    if (ok === true) {
      return res.status(200).json({});
    }

    return res.status(400).json({ error: 'password reset failed' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
