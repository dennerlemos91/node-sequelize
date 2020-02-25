const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./database');

const routes = require('./routes');

const app = express();

//Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api', routes);

app.listen(3333, () => {
  console.log('App on listen port:', 3333);
});
