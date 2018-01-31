const Web3 = require('web3');
const contract = require('truffle-contract');
const votingArtifacts = require('../build/contracts/Voting.json');

const fs = require('fs');
const solc = require('solc');

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
VotingContract = contract(votingArtifacts);
VotingContract.setProvider(web3.currentProvider);

web3.eth.accounts
['0x38d869bc76595a2c3028fdc308a6f31c57068579',
'0x38b991c9c0833a2dd4f31577b64c2291e0aa94b4',
'0x7a1b2d05ef58f5e9ddf3f3e6878cf82b8a73dfa8',
'0x0d9412a8894fde1077a359c9c6ccae3d3b8adfdf',
'0xf80a3e4234c7e27f05d18d7bf7b2f02ff78bbb96',
'0x45b415a5e79294240312003477850d27dc750adc',
'0x64912518d312a0e27c0057113ef29cd272ca840e',
'0xec5841707a448c01bc783c16cc2720b2b5f67823',
'0x93fb9bd1ec89f3567be24b3ef6c59a10ed44d9bb',
'0x48ec0cd61a697c6c9ea14d1897cabfd8878dd20b'];

// const code = fs.readFileSync('./contracts/Voting.sol').toString();
// const compiledCode = solc.compile(code);

// var abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface);
// var byteCode = compiledCode.contracts[':Voting'].bytecode;

// var VotingContract = web3.eth.contract(abiDefinition)

// VotingContract.new(['Rama','Nick','Jose'], {
//     from: web3.eth.accounts[0], gas: 4712388
// })
// .then(instance => {
//     console.log('instance ', instance);
// })


const deployedContract = {
    address: '0xdcbb34950d8bd4d28713dcb1bb50007b4e2718ef'
}

exports.getHello = function(req, res) {
    res.json({ message: 'hooray! welcome to our api!'});
};

var mainContractInstance;
exports.getCandidatesList = function(req, res) {
    console.log('GET /candidates');
    //var contractInstance = 
    VotingContract.at(deployedContract.address).then(contractInstance => {
    
    mainContractInstance = contractInstance;
    return contractInstance.getCandidates.call();
    })
    .then(candidatesHex => {
      console.log('candidatesHex', candidatesHex);
      var candidates = candidatesHex.map(parseHexToStr);
      return candidates.map(can => {
        return mainContractInstance.totalVotesFor.call(can)
          .then(votesCount => {
            return {
              candidate: can,
              votes: votesCount
            };
        });
      })
    })
    .then(result => {
      console.log('result', result);
      res.json({ message: result });
    })
}


exports.addCandidate = function(req, res) {
    console.log('POST /candidates/:candidate_name Body:' + req.body.toString());
    var contractInstance = VotingContract.at(deployedContract.address);
    contractInstance.addCandidate(req.body.candidateName, {from: web3.eth.accounts[0]})
    res.json({ message: 'candidate created' });
}

exports.getVotesByCandidate = function(req, res) {
    console.log('GET /candidates Params:' + req.params);
    var contractInstance = VotingContract.at(deployedContract.address);
    var candidateVotes = contractInstance.totalVotesFor(req.body.candidate_name, {from: web3.eth.accounts[0]})
    res.json({ message: candidateVotes });
}


exports.addVoteByCandidate = function(req, res) {
    console.log('PUT /candidates/:candidate_name Params:' + req.params.toString() );
    var contractInstance = VotingContract.at(deployedContract.address);
    var candidateVotes = contractInstance.voteForCandidate(req.params.candidate_name, {from: web3.eth.accounts[0]})
    res.json({ message: candidateVotes });
}

exports.deleteByCandidate = function(req, res) {
    console.log('DELETE /candidates/:candidate_name Params:' + req.params.toString());
    var contractInstance = VotingContract.at(deployedContract.address);
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