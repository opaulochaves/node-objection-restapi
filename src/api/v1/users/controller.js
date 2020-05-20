const omit = require('lodash/omit');
const User = require('../../../models/user');

async function findUsers() {
  const users = await User.query();

  return users.map((user) => omit(user, ['password']));
}

module.exports = {
  findUsers,
};
