var _ = require('lodash');

module.exports = function (product) {
    product = _.cloneDeep(product || {});

    return {
        validate: function () {
            return !!product.id;
        },
        toJson: function () {
            return product;
        },
        addQuantity: function (quantityToAdd) {
            _.defaults(product, {quantity: 0});
            product.quantity += quantityToAdd;
            return this.adjustPrice()
                       .adjustVat();
        },
        adjustPrice: function () {
            product.priceIncVatAmount = product.priceIncVat * product.quantity;
            return this;
        },
        adjustVat: function () {
            product.vatAmount = product.vatPercentage * product.quantity;
            return this;
        },
        getPrice: function () {
            return product.priceIncVatAmount;
        },
        getVat: function () {
            return product.vatAmount;
        }
    };
};
