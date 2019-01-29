'use strict';

const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  const myHbs = {};

  app.render('home', myHbs);
});

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
