'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db');
const validate = require('../middleware/validation');

const productInfo = {
  products: undefined,
}

router.get('/', (req, res) => {
  knex
    .select('id', 'name', 'price', 'inventory', 'updated_at')
    .from('products')
    .then((selection) => {
      productInfo.products = selection;
      res.render('products/index', productInfo);
    });
});

router.get('/new', (req, res) => {
  res.render('products/new');
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex
    .select('id', 'name', 'price', 'inventory', 'updated_at')
    .from('products')
    .where('id', id)
    .then((product) => {
      productInfo.products = product[0]; // grab the only match from query
      res.render('products/product', productInfo);
    });
});

router.get('/:id/edit?', (req, res) => {
  const id = req.params.id;

  knex
    .select('id', 'name', 'price', 'inventory')
    .from('products')
    .where('id', id)
    .then((product) => {
      productInfo.products = product[0];
      res.render('products/edit', productInfo);
    });
});

router.post('/', validate.products, (req, res) => {
  console.log(`HIT POST`);
  const data = req.body;

  knex('products')
    .insert({ 
      name: data.name, 
      price: parseFloat(data.price), 
      inventory: parseFloat(data.inventory) 
    })
      .then(console.log(`This is the POST:`, data))
      .then(knex
        .select('name', 'price', 'inventory')
        .from('products')
        .then(console.log)
      )
      .then(() => {
        res.redirect('/products');
      });
});

router.put('/:id', validate.products, (req, res) => {
  console.log(`This is the PUT:`);
  const data = req.body;
  const id = req.params.id;

  knex('products')
    .where('id', id)
    .update({ price: data.price, inventory: data.inventory, updated_at: new Date() })
    .returning('*')
    .then(console.log)
    .then(() => {
      res.redirect(`/${id}`);
    })
    .catch((err) => {
      throw err;
    });
});

router.delete('/:id', validate.products, (req, res) => {
  console.log(`HIT DELETE`);

  const id = req.params.id;

  knex('products')
    .where('id', id)
    .del()
    .then(console.log)
    .then(() => { 
      res.redirect('/products');
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = router;
