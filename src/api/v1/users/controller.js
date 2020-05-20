const omit = require('lodash/omit');
const User = require('../../../models/user');

async function findUsers() {
  const users = await User.query();

  return users.map((user) => omit(user, ['password']));
}

async function createUser({ name, email, password, avatar }) {
  const user = await User.query().insert({
    name,
    email,
    password,
    avatar,
  });

  return user;
}

module.exports = {
  findUsers,
  createUser,
};