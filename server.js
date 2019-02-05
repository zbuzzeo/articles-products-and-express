const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const routeArticles = require('./routes/articles');
const routeProducts = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/articles', routeArticles);
app.use('/products', routeProducts);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main.hbs'
}));
app.set('view engine', '.hbs');

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`);
});
