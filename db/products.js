'use strict';

const products = [];

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.reqHandler = (type, obj, res) => {
  switch (type) {
    case 'GET':
      getHandler(obj, res);
      break;
    case 'POST':
      postHandler(obj, res);
      break;
    case 'PUT':
      putHandler(obj, res);
      break;
    case 'DELETE':
      deleteHandler(obj, res);
      break;
  }
}

const foundMatch = (checkObj) => {
  if (typeof checkObj !== 'object') {
    throw new TypeError('Expected an object as input');
  }

  let exists = false;

  products.forEach(product => {
    if (product['name'] === checkObj['name']) {
      exists = true;
    }
  });

  return exists;
}

const getHandler = (obj, res) => {
  
}

const postHandler = (obj, res) => {
  let success = !foundMatch(obj);
  let message = success ? (
    'POST operation successful. Check rendering.'
  ) : (
    'POST operation unsuccessful.'
  );

  // here...
  // if successful, then redirect to /products. if unsuccessful, then redirect to /products/new and render an error message via templating.

  if (success) {
    obj['id'] = products.length;
    products.push(obj);
    res.redirect('/products');
  }

  // redirect to URL of new product
  // database handles the data first. so calling res.redirect() here might lead to a blank page. This could potentially redirect to the new product page BEFORE the material is rendered to the page. Maybe use redirect() in ../routes/products.js
  // using res.redirect()... https://expressjs.com/en/4x/api.html#res.redirect

  res.send({ "message": message, "success": success });
  return { "message": message, "success": success };
}

const putHandler = (obj, res) => {

}

const deleteHandler = (obj, res) => {

}

module.exports = {
  data: products,
  router: router
}
