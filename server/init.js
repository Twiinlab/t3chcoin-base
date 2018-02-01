const Web3 = require('web3');
const contract = require('truffle-contract');
const votingArtifacts = require('../build/contracts/Voting.json');
const config = require('./routes/config');

module.exports = function () {
    web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
    VotingContract = contract(votingArtifacts);
    VotingContract.setProvider(web3.currentProvider);

    console.log('config.blockchain: ', config.blockchain);

    if (!config.blockchain.smartContractInstance){
        VotingContract.new(['Rama','Nick','Jose'], {
            from: web3.eth.accounts[0], gas: 4712388
        })
        .then(instance => {
            console.log('instance: ', instance.address);
            config.setSmartContractInstance(instance.address);
            instance.NewVote().watch(function(error, result){
            if (!error)
                {
                console.log(parseHexToStr(result.args.candidate) + ' (' + result.args.votes + ' votes)');
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

