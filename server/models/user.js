
const libs = require('../utils/libs');

var User = function (data) {
  this.userId = libs.parseByte32ToDecimal(data[0]);
  this.userName = libs.parseHexToStr(data[1]);
  this.avatar = libs.parseByte32ToDecimal(data[2]);
  this.selectedItem = libs.parseHexToDecimal(data[3]);
  this.balance = data[4].toNumber();
  this.itemsCount = data[5].toNumber();
}
    
User.prototype.userId = {}
User.prototype.userName = {}
User.prototype.avatar = {}
User.prototype.selectedItem = {}
User.prototype.balance = {}
User.prototype.itemsCount = {}
User.prototype.items = {}


User.prototype.setItems = function ( items ) {
  this.items = items.map(libs.parseHexToDecimal);
}

User.prototype.toJson = function (id, callback) {
  return {
    userId: this.userId,
    userName: this.userName,
    avatar: this.avatar,
    selectedItem: this.selectedItem, 
    balance: this.balance,
    itemsCount: this.itemsCount,
    items: this.items
  };
}
  
module.exports = User;