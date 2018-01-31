const Web3 = require('web3');
const contract = require('truffle-contract');
const votingArtifacts = require('../build/contracts/Voting.json');
const config = require('./config');

web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
VotingContract = contract(votingArtifacts);
VotingContract.setProvider(web3.currentProvider);
web3.eth.accounts = config.blockchain.accounts;

VotingContract.new(['Rama','Nick','Jose'], {
    from: web3.eth.accounts[0], gas: 4712388
})
.then(instance => {
    console.log('instance ', instance);
})

