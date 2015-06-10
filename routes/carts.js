var router = require('./router'),
    cartsRepo = require('../repositories/carts');

module.exports = router(cartsRepo);
