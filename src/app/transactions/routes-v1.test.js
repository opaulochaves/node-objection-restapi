const supertest = require('supertest');
const { app, knex } = require('../../server');
const User = require('../users/model');

const request = supertest(app);

describe('v1/transactions', () => {
  beforeAll(async () => {
    await User.query().insert([{ name: 'human', email: 'human@test.js', password: '12345678' }]);
  });

  beforeEach(() => {
    return User.query().del();
  });

  afterAll(async () => {
    await User.query().del();
    await knex.destroy();
  });

  const endpoint = '/v1/users';

  describe('incomes', () => {
    it.skip('should create a transaction', async () => {});
    it.skip('should return 0 transactions', async () => {});
    it.skip('should return list of transactions', async () => {});
    it.skip('should only return income transactions', async () => {});
    it.skip('should not create paid transaction if tx date in the future', async () => {});
  });

  describe('expenses', () => {
    it.skip('should only return expense transactions', async () => {});
  });
});
