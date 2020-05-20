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
    const { id } = req.params;
    const user = await controller.updateUser(id, req.body);

    res.json(omit(user, 'password'));
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
