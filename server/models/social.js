
const libs = require('../utils/libs');

var Social = function (data) {
  this.socialId = libs.parseHexToStr(data[0]);
  this.totalAll = data[1].toNumber();
  this.totalTwit = data[2].toNumber();
  this.totalTwitLike = data[3].toNumber();
  this.totalTwitRetweet = data[4].toNumber();
}
    
Social.prototype.socialId = {}
Social.prototype.totalAll = {}
Social.prototype.totalTwit = {}
Social.prototype.totalTwitLike = {}
Social.prototype.totalTwitRetweet = {}


Social.prototype.toJson = function (id, callback) {
  return {
    socialId: this.socialId,
    totalAll: this.totalAll,
    totalTwit: this.totalTwit,
    totalTwitLike: this.totalTwitLike,
    totalTwitRetweet: this.totalTwitRetweet
  };
}
  
module.exports = Social;