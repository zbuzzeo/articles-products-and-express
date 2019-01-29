'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const routeArticles = require('./routes/articles');
const routeProducts = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/articles', routeArticles);
app.use('/products', routeProducts);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

// rendering should be done in the router directory. render as you receive data.
// app.get('/', (req, res) => {
//   const myHbs = {};

//   // app.render('home', myHbs);
// });

const server = app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
