const Web3 = require('web3');
const contract = require('truffle-contract');
const t3chcoinArtifacts = require('../build/contracts/T3chcoin.json');
const config = require('./config');

module.exports = function () {
    web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
    T3chcoinContract = contract(t3chcoinArtifacts);
    T3chcoinContract.setProvider(web3.currentProvider);

    if (!config.blockchain.smartContractInstance){
      T3chcoinContract.new( 'T3chcoin' , {
          from: web3.eth.accounts[0], gas: 4712388
      })
      .then(instance => {
        console.log('T3chcoin instance: ', instance.address);
        config.setSmartContractInstance(instance.address);
        instance.NewMessageEvent().watch(function(error, result){
        if (!error)
          {
          console.log(parseHexToStr(result.args.socialId) + ' (message: ' + parseHexToStr(result.args.message) + ' | type: ' + result.args.messageTypeIndex + ')');
          } else {
          console.log(error);
          }
        });
      })
    }
}

function parseHexToStr (hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
}

