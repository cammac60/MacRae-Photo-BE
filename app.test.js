const request = require('supertest');
const app = require('./app.js');

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {

  beforeEach(async () => {
    await database.seed.run();
  });

  describe('POST /api/v1/messages', () => {

    it('Should return a 201 status and the message id', async () => {
      const newMessage = {email: 'newEmail', body: 'newMessage'};
      const response = await request(app).post('/api/v1/messages').send(newMessage);
      const messages = await database('messages').where('id', response.body.id);
      const message = messages[0];
      expect(response.status).toBe(201);
      expect(message.body).toEqual(newMessage.body);
    });

    it('Should return a 422 status and an error message if a name property is not included in the request body', async () => {
      const response = await request(app).post('/api/v1/messages').send({});
      expect(response.status).toBe(422);
      expect(response.body.error).toEqual('Expected body format is: { email: <String>, body: <String>}. You\'re missing the required "email" property.');
    });

  });

  describe('GET /api/v1/images', () => {

    it.skip('Should return a 200 status and the image objects', async () => {
      const expectedImage = await database('images').select().first();
      const response = await request(app).get('/api/v1/images');
      const images = response.body;
      expect(response.status).toBe(200, done);
      expect(images.images[0].title).toEqual(expectedImage.title);
    });

  });

});
