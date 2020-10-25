require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const appPort = process.env.CLIENT_PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

app.listen(appPort, () => console.log(`Listening on port ${appPort}`));
