const path = require('path');
const env = process.env.NODE_ENV || 'development'; //'development' 'gcloud'

var config = {
    development : {
        blockchain: {
            provider: 'http://localhost:8545/'       
        }
    },
    gcloud : {
        blockchain: {
            provider: 'http://35.229.121.201:8545/'
        }
    }
};

module.exports.blockchain = config[env].blockchain;

module.exports.setSmartContractInstance = function(newAddress) {
    config.smartContractInstance = newAddress;
}

module.exports.getSmartContractInstance = function() {
    return config.smartContractInstance;
}