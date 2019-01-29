'use strict';

const dbProducts = require('../db/products');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const urlEncoded = bodyParser.urlencoded({ extended: false });

router.post('/', urlEncoded, (req, res) => {
  // send to back end:
  dbProducts.router.reqHandler('POST', req.body, res);  

  // include placeholders for these in your templates: name, price, inventory
  // res.render('/', req.body);
});

module.exports = router;
