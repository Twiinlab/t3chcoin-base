pragma solidity ^0.4.17;

contract T3chcoin {

  enum MessageTypes {Twit, TwitLike, TwitRetweet }
  enum Status {Pending, Active, Blocked }
  
  struct MessageDetail {
    bytes32 message;
    MessageTypes messageType;
  }
  struct SocialProfile {
    bytes32 userId;
    uint totalAll;
    uint totalTwit;
    uint totalTwitLike;
    uint totalTwitRetweet;
    MessageDetail[] messages;
  }
  struct UserProfile {
    bytes32 userName;
    bytes32 status;
    SocialProfile[] socials;
  }

  address owner;
  mapping(bytes32 => bytes32[]) items;
  mapping(bytes32 => uint256) balances;
  mapping(bytes32 => SocialProfile) socials;
  bytes32[] socialIds;
  mapping(bytes32 => UserProfile) users;
  bytes32[] userIds;
  
  
  function T3chcoin(bytes32[] candidateNames) public {
    owner = tx.origin;
  }

  function getTopSocials() public view returns( bytes32[5][10] ) {
    //while return array with top 10 social profile ()
    SocialProfile[] storage result;
    for (uint i = 0; i < socialIds.length; i++) {
      SocialProfile storage checkItem = socials[socialIds[i]];
      if (i < 10) {
        result.push(checkItem);
      } else {
        for (uint j = 0; j < result.length; j++) {
          var item = result[j];
          if (item.totalAll < checkItem.totalAll) {
            result[j] = checkItem;
            break;
          }
        }
      }
    }
    return flatSocialProfileList(result);
  }

  function flatSocialProfileList(SocialProfile[] list) public returns( bytes32[5][10] ) {
    bytes32[5][10] storage result;
    for (uint i = 0; i < list.length; i++) {
      result[i] = [bytes32(list[i].userId), 
                   bytes32(list[i].totalAll),
                   bytes32(list[i].totalTwit),
                   bytes32(list[i].totalTwitLike),
                   bytes32(list[i].totalTwitRetweet)];
    }
    return result;
  }

  // function removeCandidate(bytes32 candidateName) public returns(bytes32[]) {
  //     require(validCandidate(candidateName));
  //     var index = indexOf(candidateList, candidateName);
  //     if (index >= 0) {
  //       candidateList = removeCandidateByIndex(index);
  //     }
  //     return candidateList;
  // }

  // function removeCandidateByIndex(uint index) public returns(bytes32[]) {
  //   if (index >= candidateList.length) {
  //     return candidateList;
  //   }
  //   for (uint i = index; i < candidateList.length-1; i++) {
  //       candidateList[i] = candidateList[i+1];
  //   }
  //   delete candidateList[candidateList.length-1];
  //   candidateList.length--;
  //   return candidateList;
  // }

  // function totalVotesFor(bytes32 candidate) public view returns (uint8) {
  //   require(validCandidate(candidate));
  //   return votesReceived[candidate];
  // }

  // function voteForCandidate(bytes32 candidate) public returns (uint8) {
  //   require(validCandidate(candidate));
  //   votesReceived[candidate] += 1;
  //   NewVote(candidate, votesReceived[candidate]);
  //   return votesReceived[candidate];
  // }

  
  // function indexOf(bytes32[] values, bytes32 value) public pure returns(uint) {
  //   uint i = 0;
  //   while (values[i] != value) {
  //     i++;
  //   }
  //   return i;
  // }

  // function validCandidate(bytes32 candidate) public view returns (bool) {
  //   for (uint i = 0; i < candidateList.length; i++) {
  //     if (candidateList[i] == candidate) {
  //       return true;
  //     }
  //   }
  //   return false;
  //  }

}