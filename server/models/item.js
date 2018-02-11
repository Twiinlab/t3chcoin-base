
const libs = require('../utils/libs');

var Item = function (data) {
  this.itemId = data[2];
  this.description = data[0];
  this.price = data[1].toNumber();
}

Item.prototype.itemId = {}
Item.prototype.description = {}
Item.prototype.price = {}


Item.prototype.toJson = function (id, callback) {
  return {
    itemId: this.itemId,
    description: this.description,
    price: this.price
  };
}
  
module.exports = Item;