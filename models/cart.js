var _ = require('lodash');
var productModel = require('../models/product');

module.exports = function (cart) {
    cart = _.cloneDeep(cart || {});
    var cartProducts = cart.rows;

    return {
        validate: function () {
            return !!cart.id;
        },
        toJson: function () {
            return cart;
        },
        addProduct: function (newProduct, quantity) {
            var cartProduct = _.find(cartProducts, product => product.id === newProduct.id);
            cartProducts.push(productModel(cartProduct || newProduct)
                                  .addQuantity(quantity)
                                  .toJson());
            return this.adjustTotalPrice()
                       .adjustTotalVat();
        },
        adjustTotalPrice: function () {
            cart.totalPriceIncVatAmount =  _.sum(cartProducts,
                                                 cartProduct => productModel(cartProduct).getPrice());
            return this;
        },
        adjustTotalVat: function () {
            cart.totalVatAmount = _.sum(cartProducts,
                                        cartProduct => productModel(cartProduct).getVat());
            return this;
        }
    };
};
