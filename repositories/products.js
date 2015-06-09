var _ = require('lodash');
var productModel = require('../models/product');

var productsStorage = [];

module.exports =  {
    retrieve: function (callback) {
        callback(productsStorage);
    },

    retrieveById: function (id, callback, errback) {
        var product = _.find(productsStorage, product => product.id === id);
        if (product) {
            callback(product);
        } else {
            errback();
        }
    },

    update: function (id, updatedProduct, callback, errback) {
        var index = _.findIndex(productsStorage, product => product.id === id);
        if (_.isNumber(index)) {
            productsStorage[index] = updatedProduct;
            callback();
        } else {
            errback();
        }
    },

    create: function (product, callback, errback) {
        product = productModel(product);
        if (product.validate()) {
            productsStorage.push(product.toJson());
            callback();
        } else {
            errback();
        }
    },

    delete: function (id, callback, errback) {
        var removed = _.remove(productsStorage, product => product.id === id);
        if (_.first(removed)) {
            callback();
        } else {
            errback();
        }
    }
};
