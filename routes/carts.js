var router = require('./router');
var cartsRepo = require('../repositories/carts');

module.exports = router(cartsRepo);
