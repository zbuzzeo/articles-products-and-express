'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');
const validate = require('../middleware/validation');

const articleInfo = {
  articles: undefined,
}

router.get('/', (req, res) => {
  knex('articles')
    .select('url_title', 'title', 'author', 'body')
    .then((selection) => {
      console.log(selection);
      articleInfo.articles = selection;
      res.render('articles/index', articleInfo)
    })
});

router.get('/new', (req, res) => {
  res.render('articles/new');
});

router.get('/:url_title', (req, res) => {
  let url_title = req.params.url_title;
  
  knex('articles')
    .select('url_title', 'title', 'author', 'body', 'created_at', 'updated_at')
    .where('url_title', url_title)
    .then((selection) => {
      console.log(selection);
      articleInfo.articles = selection[0];
      res.render('articles/article', articleInfo);
    });
});

router.get('/:url_title/edit?', (req, res) => {
  let url_title = req.params.url_title;

  knex('articles')
    .select('url_title', 'title', 'author', 'body', 'updated_at')
    .where('url_title', url_title)
    .then((selection) => {
      articleInfo.articles = selection[0];
      res.render('articles/edit', articleInfo);
    });
});

router.post('/', validate.articles, (req, res) => {
  const data = req.body;

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
    )
    .then(() => {
      res.redirect('/articles');
    });
});

router.put('/:url_title', validate.articles, (req, res) => {
  const data = req.body;
  const url_title = req.params.url_title;

  knex('articles')
    .where('url_title', url_title)
    .update({ 
        url_title: encodeURI(data.title),
        title: data.title,
        author: data.author,
        body: data.body
      })
      .returning('*')
      .then(console.log)
      .then(() => {
        res.redirect(`articles/${url_title}`);
      })
     .catch((err) => {
       res.redirect(`articles/${url_title}/edit`);
       throw err;
     });
});

router.delete('/:url_title', validate.articles, (req, res) => {
  const url_title = req.params.url_title;
  const data = req.body;

  knex('articles')
    .where('title', data.title)
    .delete()
    .then(() => {
      res.redirect('/articles');
    })
    .catch((err) => {
      res.redirect(`/articles/${url_title}`);
      throw err;
    });
});

module.exports = router;