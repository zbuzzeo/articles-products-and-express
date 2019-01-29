'use strict';

const articles = [];

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();



module.exports = {
  data: articles,
  router: router
}
