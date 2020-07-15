const supertest = require('supertest');
const { app, knex } = require('../../../app');
const User = require('../../../models/user');

const request = supertest(app);

describe('v1/users', () => {
  beforeEach(() => {
    return User.query().truncate();
  });

  afterAll(async () => {
    await knex.destroy();
  });

  const endpoint = '/v1/users';

  it('GET returns an empty list', async (done) => {
    const response = await request.get(endpoint);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    done();
  });

  it('GET returns all users', async (done) => {
    await User.query().insert([
      { name: 'user 1', email: 'user1@test.js', password: '12345678' },
      { name: 'user 2', email: 'user2@test.js', password: '12345678' },
    ]);

    const response = await request.get(endpoint);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    response.body.forEach((user) => {
      expect(user).not.toHaveProperty('password');
    });
    done();
  });

  it('POST create user', async (done) => {
    const user = { name: 'user 1', email: 'user1@test.js', password: '12345678' };

    const response = await request.post(endpoint).send(user);

    expect(response.status).toBe(201);
    expect(response.type).toMatch(/json/);
    expect(response.body).toHaveProperty('name', 'user 1');
    expect(response.body).not.toHaveProperty('password');
    done();
  });

  it('POST do not create user with duplicate email', async (done) => {
    const user = { name: 'user 1', email: 'user1@test.js', password: '12345678' };

    await User.query().insert(user);

    const response = await request.post(endpoint).send(user);

    expect(response.status).toBe(409);

    done();
  });

  it('PATCH update user', async (done) => {
    const user = { name: 'user 1', email: 'user1@test.js', password: '12345678' };
    const dbUser = await User.query().insert(user);

    const data = { name: 'user 999' };

    const response = await request.patch(`${endpoint}/${dbUser.id}`).send(data);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'user 999');

    done();
  });

  it('POST reset password', async (done) => {
    const user = { name: 'user 1', email: 'user1@test.js', password: '12345678' };
    const dbUser = await User.query().insert(user);

    const data = { password: '999aaabbb' };

    const response = await request.post(`${endpoint}/${dbUser.id}/resetPassword`).send(data);

    expect(response.status).toBe(200);

    done();
  });
});
