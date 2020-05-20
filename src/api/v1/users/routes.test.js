const supertest = require('supertest');
const app = require('../../../app');
const User = require('../../../models/user');

const request = supertest(app);

describe('v1/users', () => {
  beforeEach(() => {
    return User.query().truncate();
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

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toMatch(/email already in use/);

    done();
  });
});
