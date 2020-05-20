const yup = require('yup');
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

async function updateUser(id, { name, avatar }) {
  const updatedUser = await User.query().patchAndFetchById(id, { name, avatar });

  return updatedUser;
}

async function resetPassword(id, { password }) {
  const user = await User.query().findById(id);

  try {
    const schema = yup.object().shape({
      password: yup.string().required().min(8).max(50),
    });

    await schema.validate({ password });

    const matches = await user.passwordMatches(password);

    if (matches) {
      throw new Error('set a different password');
    }

    return await user.$query().patchAndFetchById(id, { password });
  } catch (error) {
    console.log(error);
    return { error: 'error' };
  }
}

module.exports = {
  findUsers,
  createUser,
  updateUser,
  resetPassword,
};
