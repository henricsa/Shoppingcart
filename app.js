/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts"/>

process.env.PORT = 8080;

var express = require('express'),
    bodyParser = require('body-parser'),
    utils = require('./utils'),
    app = express();

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(utils.middlewares.location)
   .use('/products', require('./routes/products'))
   .use('/carts', require('./routes/carts'))
   .use(utils.middlewares.notFound)
   .use(utils.middlewares.errorResponse);

module.exports = app;
