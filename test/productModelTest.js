var expect = require('chai').expect,
    productModel = require('../models/product.js');

var product = {
    'id': 'product-id',
    'name': 'Product name',
    'priceIncVat': 10.0,
    'vatPercentage': 0.25,
    'vatAmount': 2.5
};

describe('productModel', function() {
    describe('#init', function() {
        it('should create a new object', function() {
            var result = productModel(product).toJson();
            expect(result).to.not.equal(product);
        });
    });
    describe('#addQuantity()', function() {
        it('should add quantity', function(){
            var quantity = 1;
            var result = productModel(product).addQuantity(quantity).toJson();

            expect(result.quantity).to.equal(quantity);
        });
        it('should adjust price', function(){
            var quantity = 2;
            var result = productModel(product).addQuantity(quantity).toJson();

            expect(result.priceIncVatAmount).to.equal(product.priceIncVat * quantity);
        });
        it('should adjust vat', function(){
            var quantity = 2;
            var result = productModel(product).addQuantity(quantity).toJson();

            expect(result.vatAmount).to.equal(product.vatPercentage * quantity);
        });
   });
});
