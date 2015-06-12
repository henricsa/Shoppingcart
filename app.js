/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts"/>

process.env.PORT = 8080;

var express = require('express'),
    bodyParser = require('body-parser'),
    middlewares = require('./utils').middlewares,
    app = express();

app.use(bodyParser.json())
   .use(bodyParser.urlencoded({ extended: false }))
   .use(middlewares.location)
   .use('/products', require('./routes/products'))
   .use('/carts', require('./routes/carts'))
   .use(middlewares.notFound)
   .use(middlewares.errorResponse);

module.exports = app;
