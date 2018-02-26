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
            provider: 'http://104.199.25.52:8545/' //'http://35.205.133.70:8545/'
        }
    },
    smartContractInstance: '0xf68a76f9176302c9db228e41064505a2c42cf274', //'0xffdca7ead87c9289e2f943254ac165015a859d46', //'0xf68a76f9176302c9db228e41064505a2c42cf274' //default value
};

module.exports.blockchain = config[env].blockchain;

module.exports.setSmartContractInstance = function(newAddress) {
    try {
        config.smartContractInstance = newAddress;
        return true;
    } catch (error) {
        return false;
    }
    
}

module.exports.getSmartContractInstance = function() {
    return config.smartContractInstance;
}