const path = require('path');

var config = {
    blockchain: {
        provider: 'http://localhost:8545/',
    }
};

module.exports.blockchain = config.blockchain;

module.exports.setSmartContractInstance = function(newAddress) {
    config.smartContractInstance = newAddress;
}

module.exports.getSmartContractInstance = function() {
    return config.smartContractInstance;
}