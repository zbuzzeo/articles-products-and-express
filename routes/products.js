const products = require('../db/products');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  let data = products.getData();

  res.json(data);
  res.end();
});

router.get('/:id', (req, res) => {
  
});

router.get('/:id/edit', (req, res) => {

});

router.get('/new', (req, res) => {

});

router.post('/', (req, res) => {
  // send to back end:
  if (products.addProduct(req.body, res).success) {
    res.redirect('/');
  } else {
    res.redirect('/new');
  }
});

// router.put('/:id', (req, res) => {
//   let id = Number(req.params.id);
//   if (products.updateProduct(id, req.body).success) {
//     res.redirect('/:id');
//   } else {
//     res.redirect('/:id/edit');
//   }
// });

router.put('/:id', (req, res) => {
  let id = Number(req.params.id);
  let product = req.body;

  if (isNaN(id) || (typeof product.name || typeof product.price || typeof product.inventory) !== 'string') {
    res.redirect('/:id/edit');
  }
});

router.delete('/:id', (req, res) => {
  let id = Number(req.params.id);

  if (isNaN(id)) {
    res.redirect('/products/:id');
  }

  products.removeProduct(id);
  res.redirect('/products');
});

module.exports = router;
