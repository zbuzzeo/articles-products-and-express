'use strict';

// for products.... validate that:
// the name.length given in req.body is > 0.
// the price property is a number.
// the inventory property is valid input.

const basicValidation = (req) => {
  const data = req.body;
  let passed = true;

  if (!data.name || data.name.length < 0) {
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

const validateProduct = (req, res, next) => {
  const passed = basicValidation(req);

  if (passed) {
    next();
  } else {
    res.redirect('/products/new');
  }
}

const validateArticle = (req, res, next) => {
  let passed;
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
