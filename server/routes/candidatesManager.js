const Web3 = require('web3');
const contract = require('truffle-contract');
const votingArtifacts = require('../../build/contracts/Voting.json');
const config = require('./config');

console.log('blockchain ', config.blockchain);

web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
VotingContract = contract(votingArtifacts);
VotingContract.setProvider(web3.currentProvider);

exports.getHello = function(req, res) {
    res.json({ message: 'hooray! welcome to our api!'});
};

var mainContractInstance;
exports.getCandidatesList = function(req, res) {
    console.log('GET /candidates');
    getCandidatesListFromBlockchain(VotingContract, config.getSmartContractInstance())
    .then(result => { res.json({ message: result }); })
    .catch(error => { console.log('error', error); });
}

const getCandidatesListFromBlockchain = async (customContract, customAddress) => {  
  var contractInstance =  await customContract.at(customAddress);
  var candidatesHex = await contractInstance.getCandidates.call();
  var candidates = candidatesHex.map(parseHexToStr);
  return await Promise.all(candidates.map(async (can) => {
      return {
        candidate: can,
        votes: await contractInstance.totalVotesFor.call(can)
      };
  }));
}


exports.addCandidate = function(req, res) {
    console.log('POST /candidates/:candidate_name Body:' + req.body.toString());
    var contractInstance = VotingContract.at(config.getSmartContractInstance());
    contractInstance.addCandidate(req.body.candidateName, {from: web3.eth.accounts[0]})
    res.json({ message: 'candidate created' });
}

exports.getVotesByCandidate = function(req, res) {
    console.log('GET /candidates Params:' + req.params);
    var contractInstance = VotingContract.at(config.getSmartContractInstance());
    var candidateVotes = contractInstance.totalVotesFor(req.body.candidate_name, {from: web3.eth.accounts[0]})
    res.json({ message: candidateVotes });
}


exports.addVoteByCandidate = function(req, res) {
    console.log('PUT /candidates/:candidate_name Params:' + req.params.toString() );
    var contractInstance = VotingContract.at(config.getSmartContractInstance());
    var candidateVotes = contractInstance.voteForCandidate(req.params.candidate_name, {from: web3.eth.accounts[0]})
    res.json({ message: candidateVotes });
}

exports.deleteByCandidate = function(req, res) {
    console.log('DELETE /candidates/:candidate_name Params:' + req.params.toString());
    var contractInstance = VotingContract.at(config.getSmartContractInstance());
    var candidateVotes = contractInstance.removeCandidate(req.params.candidate_name, {from: web3.eth.accounts[0]})
    res.json({ message: 'candidate deleted' });
}
  
  function parseStrToHex (str) {
    return Buffer.from(str).toString('hex');
  }
  
  function parseHexToStr (hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
        var v = parseInt(hex.substr(i, 2), 16);
        if (v) str += String.fromCharCode(v);
    }
    return str;
  }