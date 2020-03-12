const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.locals.title = 'Messages';
app.locals.id = 0;

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

module.exports = app;

app.post('/api/v1/messages', async (request, response) => {
  const data = request.body;
  for (let requiredParameter of ['email', 'body']) {
    if (!data.hasOwnProperty(requiredParameter)) {
      return response.status(422).json({ error:
        `Expected body format is: { email: <String>, body: <String>}. You\'re missing the required "${requiredParameter}" property.` })
    }
  } try {
    const id = await database('messages').insert(data, 'id');
    response.status(201).json({ id: id[0] });
  } catch (error) {
    response.status(500).json({ error });
  }
});
