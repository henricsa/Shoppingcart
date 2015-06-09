/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/lodash/lodash.d.ts" />

process.env.PORT = 8080;

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    req.getLocation = function(id) {
        return req.protocol + "://" + req.get('host') + req.originalUrl + '/' + id;
    };
    return next();
});

app.use('/products', require('./controllers/products'));
app.use('/carts', require('./controllers/carts'));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
});


module.exports = app;
