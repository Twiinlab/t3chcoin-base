pragma solidity ^0.4.17;

contract Voting {

  mapping (bytes32 => uint8) public votesReceived;
  bytes32[] public candidateList;
  event NewVote( bytes32 candidate, uint votes);

  function Voting(bytes32[] candidateNames) public {
    candidateList = candidateNames;
  }

  function getCandidates() public view returns(bytes32[]) {
    return candidateList;
  }

  function addCandidate(bytes32 candidateName) public {
    candidateList.push(candidateName);
  }

  function removeCandidate(bytes32 candidateName) public returns(bytes32[]) {
      require(validCandidate(candidateName));
      var index = indexOf(candidateList, candidateName);
      if (index >= 0) {
        candidateList = removeCandidateByIndex(index);
      }
      return candidateList;
  }

  function removeCandidateByIndex(uint index) public returns(bytes32[]) {
    if (index >= candidateList.length) {
      return candidateList;
    }
    for (uint i = index; i < candidateList.length-1; i++) {
        candidateList[i] = candidateList[i+1];
    }
    delete candidateList[candidateList.length-1];
    candidateList.length--;
    return candidateList;
  }

  function totalVotesFor(bytes32 candidate) public view returns (uint8) {
    require(validCandidate(candidate));
    return votesReceived[candidate];
  }

  function voteForCandidate(bytes32 candidate) public returns (uint8) {
    require(validCandidate(candidate));
    votesReceived[candidate] += 1;
    NewVote(candidate, votesReceived[candidate]);
    return votesReceived[candidate];
  }

  
  function indexOf(bytes32[] values, bytes32 value) public pure returns(uint) {
    uint i = 0;
    while (values[i] != value) {
      i++;
    }
    return i;
  }

  function validCandidate(bytes32 candidate) public view returns (bool) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
   }

}