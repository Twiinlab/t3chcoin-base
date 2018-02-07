pragma solidity 0.4.18;

contract T3chcoin {

  enum MessageTypes {Twit, TwitLike, TwitRetweet }
  MessageTypes[] private idToMessageTypes = [ MessageTypes.Twit, MessageTypes.TwitLike, MessageTypes.TwitRetweet];
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
  
  function T3chcoin() public {
    owner = tx.origin;
  }
  
  function isInSocialIds(bytes32 newSocialId) public view returns (bool) {
    for (uint i = 0; i < socialIds.length; i++) {
      if (socialIds[i] == newSocialId) {
        return true;
      }
    }
    return false;
  }

  function addSocial(bytes32 socialId, bytes32 message, uint messageTypeIndex) public {
    MessageTypes mt = idToMessageTypes[messageTypeIndex];
    if (!isInSocialIds(socialId)) {
      socialIds.push(socialId);
      socials[socialId].userId = socialId;
    }
    increaseSocialType(socialId, mt);
    socials[socialId].messages.push(MessageDetail(message,mt));
  }

  function increaseSocialType(bytes32 socialId, MessageTypes messageType) public {
    if (messageType == MessageTypes.Twit) {
      socials[socialId].totalTwit++;
    } else if (messageType == MessageTypes.TwitLike) {
      socials[socialId].totalTwitLike++;
    } else if (messageType == MessageTypes.TwitRetweet) {
      socials[socialId].totalTwitRetweet++;
    }
    socials[socialId].totalAll++;
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

  function flatSocialProfileList(SocialProfile[] list) public returns(bytes32[5][10]) {
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

}