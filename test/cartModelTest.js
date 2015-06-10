var expect = require('chai').expect,
    cartModel = require('../models/cart.js');

var cart = {
  'id': 'cart-id',
  'rows': [],
  'totalPriceIncVatAmount': 0,
  'totalVatAmount': 0
};
var productOne = {
    'id': 'product-id-one',
    'name': 'Product name',
    'priceIncVat': 10.0,
    'vatPercentage': 0.25
};
var productTwo = {
    'id': 'product-id-two',
    'name': 'Product name',
    'priceIncVat': 5.0,
    'vatPercentage': 0.1
};

describe('cartModel', function() {
    describe('#init', function() {
        it('should create a new object', function() {
            var result = cartModel(cart).toJson();
            expect(result).to.not.equal(cart);
        });
    });
    describe('#addProduct()', function() {
        it('should add product', function(){
            var quantity = 1;
            var result = cartModel(cart)
                            .addProduct(productOne, quantity)
                            .toJson();

            expect(result.rows).to.have.length(1);
            expect(result.rows[0].id).to.equal('product-id-one');
        });
        it('should adjust price', function(){
            var quantity = 2;
            var result = cartModel(cart)
                            .addProduct(productOne, quantity)
                            .addProduct(productTwo, quantity)
                            .toJson();
            var productOnePrice = productOne.priceIncVat * quantity;
            var productTwoPrice = productTwo.priceIncVat * quantity;
            expect(result.totalPriceIncVatAmount).to.equal(productOnePrice + productTwoPrice);
        });
        it('should adjust vat', function(){
            var quantity = 2;
            var result = cartModel(cart)
                            .addProduct(productOne, quantity)
                            .addProduct(productTwo, quantity)
                            .toJson();
            var productOneVat = productOne.vatPercentage * quantity;
            var productTwoVat = productTwo.vatPercentage * quantity;
            expect(result.totalVatAmount).to.equal(productOneVat + productTwoVat);
        });
   });
});
