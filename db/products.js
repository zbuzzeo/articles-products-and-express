'use strict';

const products = [];
const methods = {};

const getAllProducts = () => {
  return products;
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

const getProduct = (obj, res) => {

}

const addProduct = (obj, res) => {
  let success = !foundMatch(obj);
  let message = success ? (
    'POST operation successful. Check rendering.'
  ) : (
    'POST operation unsuccessful.'
  );

  if (success) {
    obj['id'] = products.length;
    products.push(obj);
    console.log(getAllProducts());
  }

  return { "message": message, "success": success };
}

const updateProduct = (id, newProduct) => {
  let oldProduct = getAllProducts().find(product => {
    return product.id === id;
  });

  oldProduct.name = newProduct.name;
  oldProduct.price = newProduct.price;
  oldProduct.inventory = newProduct.inventory;

  console.log(getAllProducts());

  return oldProduct;
}

const removeProduct = (id) => {
  let withoutId = getAllProducts().filter(product => { return product.id !== id });

  return productsData = withoutId;
}

module.exports = {
  getData: getAllProducts,
  getProduct : getProduct,
  addProduct : addProduct,
  updateProduct : updateProduct,
  removeProduct : removeProduct
}
