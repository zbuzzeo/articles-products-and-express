'use strict';

// for products.... validate that:
// the name.length given in req.body is > 0.
// the price property is a number.
// the inventory property is valid input.

const dataValidationProducts = (req) => {
  const data = req.body;
  let passed = true;

  if (!data.name || !data.name.length) {
    console.log('name HIT');
    passed = false;
  }

  if (!data.price || data.price < 0) {
    console.log('price HIT');
    passed = false;
  }

  if (!data.inventory || data.inventory < 0) {
    console.log('inventory HIT');
    passed = false;
  }

  return passed;
}

const dataValidationArticles = (req) => {
  const data = req.body;
  let passed = true;

  if (!data.title || !data.title.length) {
    console.log('title HIT');
    passed = false;
  }

  if (!data.author) {
    console.log('author HIT');
    passed = false;
  }

  if (!data.body) {
    console.log('body HIT');
    passed = false
  }

  return passed;
}

const validateProduct = (req, res, next) => {
  const passed = dataValidationProducts(req);

  if (passed) {
    next();
  } else {
    res.redirect('products/new');
  }
}

const validateArticle = (req, res, next) => {
  console.log(`req.body is:`); console.log(req.body);
  const passed = dataValidationArticles(req);

  if (passed) {
    next();
  } else {
    res.redirect('articles/new');
  }
}

// might use later

// const validateProductPost = (req, res, next) => {
//   const passed = basicValidation(req);

//   if (passed) {
//     next();
//   } else {
//     res.redirect('/products/new');
//   }
// }

// const validateProductPut = (req, res, next) => {
//   const passed = basicValidation(req);

//   if (passed) {
//     next();
//   } else {
//     res.redirect('/products/:id/edit');
//   }
// }

module.exports = {
  // use later
  // products : {
  //   post : validateProductPost,
  //   put : validateProductPut
  // },
  products: validateProduct,
  articles : validateArticle
}
