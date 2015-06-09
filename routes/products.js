var router = require('./router');
var productsRepo = require('../repositories/products');

module.exports = router(productsRepo);
