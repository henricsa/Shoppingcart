var router = require('./router'),
    productsRepo = require('../repositories/products');

module.exports = router(productsRepo);
