const request = require('supertest');
const app = require('../index.js');
const User = require('../Models/Users.js');

describe('/users', () => {
  let userId;
  beforeAll(async () => {
    const user = await User.query().insert({
      username: 'Test User',
      email: 'testuser@example.com',
      password: 'password123'
    });
    userId = user.id;
  });
  afterAll(async () => {
    await User.query().deleteById(userId);
  });

  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should get user by ID', async () => {
    const response = await request(app).get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
  });

  it('should return 404 for non-existing user', async () => {
    const response = await request(app).get('/users/8');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should create a new user', async () => {
    const newUser = {
      username: 'New User',
      email: 'newuser@example.com',
      password: 'password123'
    };
    const response = await request(app).post('/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    await User.query().deleteById(response.body.id);
  });

  it('should update an existing user', async () => {
    const updatedData = { name: 'Updated User' };
    const response = await request(app).patch(`/users/${userId}`).send(updatedData);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated User');
  });

  it('should return 404 when updating non-existing user', async () => {
    const response = await request(app).patch('/users/8').send({ name: 'Non-existent User' });
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  it('should delete an existing user', async () => {
    const newUser = await User.query().insert({
      username: 'User to delete',
      email: 'deleteuser@example.com',
      password: 'password123'
    });
    const response = await request(app).delete(`/users/${newUser.id}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 when deleting non-existing user', async () => {
    const response = await request(app).delete('/users/8');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });
});
