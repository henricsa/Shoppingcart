var _ = require('lodash'),
    cartModel = require('../models/cart'),
    products = require('./products'),
    cartsStorage = [];

module.exports =  {
    retrieve: function (callback) {
        callback(cartsStorage);
    },

    retrieveById: function (id, callback, errback) {
        var cart = _.find(cartsStorage, cart => cart.id === id);
        if (cart) {
            callback(cart);
        } else {
            errback();
        }
    },

    update: function (id, cartProduct, callback, errback) {
        var index = _.findIndex(cartsStorage, cart => cart.id === id);
        if (_.isNumber(index)) {
            products.retrieveById(cartProduct.productId,
                product => {
                    cartsStorage[index] = cartModel(cartsStorage[index])
                                              .addProduct(product, cartProduct.quantity)
                                              .toJson();
                    callback();
                },
                () => errback());
        } else {
            errback();
        }
    },

    create: function (cart, callback, errback) {
        if (cartModel(cart).validate()) {
            cartsStorage.push(cart);
            callback();
        } else {
            errback();
        }
    },

    delete: function (id, callback, errback) {
        var removed = _.remove(cartsStorage, cart => cart.id === id);
        if (_.first(removed)) {
            callback();
        } else {
            errback();
        }
    }
};
