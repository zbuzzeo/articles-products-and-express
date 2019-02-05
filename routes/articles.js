'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');
const validate = require('../middleware/validation');

const articleInfo = {
  articles: undefined,
}

router.get('/', (req, res) => {
  knex
    .select('id', 'url_title', 'title', 'author', 'body')
    .from('articles')
    .then((selection) => {
      articleInfo.articles = selection;
      res.render('articles/index', articleInfo);
    });
});

router.get('/:id', (req, res) => {

});

router.post('/', validate.articles, (req, res) => {
  const data = req.body;

  console.log(`before:`);
  knex('articles').select().then(console.log);

  knex('articles')
    .insert({
      title: data.title,
      url_title: encodeURI(data.title),
      author: data.author,
      body: data.body
    })
    .then(
      knex
        .select('title', 'url_title', 'author', 'body')
        .from('articles')
        .then(console.log)
    )
    .then(() => {
      res.redirect('/articles');
    });
});

module.exports = router;