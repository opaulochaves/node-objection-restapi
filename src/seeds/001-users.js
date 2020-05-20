const bcrypt = require('bcrypt');
const faker = require('faker');

const users = [
  { name: 'King James', email: 'king@so11os.js', id: '1fc4fd85-2871-4d12-a267-df537a2ea908' },
  { name: 'Jonh Ferreira', email: 'john@so11os.js', id: '6a03d2de-c001-4f47-a649-c8ceb6b5405b' },
  { name: 'Peter Call', email: 'peter@so11os.js', id: '575730af-b325-4e83-8286-311c28324b1c' },
].map((user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  password: bcrypt.hashSync('12345678', 10),
  avatar: faker.image.avatar(),
}));

// will be used for testing purpose later
module.exports.users = users;

module.exports.seed = async function (knex) {
  await knex('users').del().insert(users);
};
