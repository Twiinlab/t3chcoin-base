
const libs = require('../utils/libs');

var User = function (data) {
  this.userId = libs.parseHexToStr(data[0]);
  this.userName = libs.parseHexToStr(data[1]);
  this.avatar = libs.parseHexToStr(data[2]);
  this.balance = data[3];
  this.itemsCount = data[4];
}
    
User.prototype.userId = {}
User.prototype.userName = {}
User.prototype.avatar = {}
User.prototype.balance = {}
User.prototype.itemsCount = {}
User.prototype.items = {}


User.prototype.setItems = function ( items ) {
  this.items = items.map(libs.parseHexToStr);
}

User.prototype.toJson = function (id, callback) {
  return {
    userId: this.userId,
    userName: this.userName,
    avatar: this.avatar,
    balance: this.balance,
    itemsCount: this.itemsCount,
    items: this.items
  };
}
  
module.exports = User;