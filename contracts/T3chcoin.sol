pragma solidity 0.4.18;

contract T3chcoin {

  enum MessageTypes {Twit, TwitLike, TwitRetweet }
  MessageTypes[] private idToMessageTypes = [ MessageTypes.Twit, MessageTypes.TwitLike, MessageTypes.TwitRetweet];
  enum Status {Pending, Active, Blocked }
  Status[] private idToStatus = [ Status.Pending, Status.Active, Status.Blocked];
  
  
  struct MessageDetail {
    bytes32 message;
    MessageTypes messageType;
  }
  struct SocialProfile {
    bytes32 socialId;
    uint totalAll;
    uint totalTwit;
    uint totalTwitLike;
    uint totalTwitRetweet;
    MessageDetail[] messages;
  }
  struct UserProfile {
    bytes32 userId;
    bytes32 userName;
    Status status;
    bytes32[] socials;
  }

  address public owner;
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

  function isInUserIds(bytes32 newUserId) public view returns (bool) {
    for (uint i = 0; i < userIds.length; i++) {
      if (userIds[i] == newUserId) {
        return true;
      }
    }
    return false;
  }

  function isSocialInUser(bytes32 userId, bytes32 socialId) public view returns (bool) {
    var newUserProfile = users[userId];
    for (uint i = 0; i < newUserProfile.socials.length ; i++) {
      if (newUserProfile.socials[i] == socialId) {
        return true;
      }
    }
    return false;
  }
  
  function getSocialIdsCount() public view returns(uint) {
    return socialIds.length;
  }

  function addSocial(bytes32 socialId, bytes32 message, uint messageTypeIndex) public {
    MessageTypes mt = idToMessageTypes[messageTypeIndex];
    if (!isInSocialIds(socialId)) {
      var newSocialProfile = socials[socialId];
      newSocialProfile.socialId = socialId;
      newSocialProfile.totalAll = 0;
      newSocialProfile.totalTwit = 0;
      newSocialProfile.totalTwitLike = 0;
      newSocialProfile.totalTwitRetweet = 0;
      socialIds.push(socialId);
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

  function getSocialProfileById(bytes32 socialId) public view returns( bytes32, uint, uint, uint, uint ) {
    return (bytes32(socials[socialId].socialId),
            socials[socialId].totalAll,
            socials[socialId].totalTwit,
            socials[socialId].totalTwitLike,
            socials[socialId].totalTwitRetweet);
  }

  //return array with top N social profile
  function getTopSocials(uint resultCount) public view returns( bytes32[] ) {
    var result = new SocialProfile[](resultCount);
    for (uint i = 0; i < socialIds.length; i++) {
      var checkItem = socials[socialIds[i]];
      if (i < resultCount) {
        result[i] = checkItem;
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
    var flatResult = new bytes32[](resultCount);
    var socialListCount = resultCount > socialIds.length ? socialIds.length : resultCount;
    for (uint z = 0; z < socialListCount; z++) {
      if (z < (result.length - 1) ) {
        flatResult[z] = result[z].socialId;
      } else {
        flatResult[z] = "";
      }
    }
    return flatResult;
  }

  function addUser(bytes32 userId, bytes32 userName, bytes32 socialId) public {
    if (!isInUserIds(userId)) {
      var newUserProfile = users[userId];
      newUserProfile.userId = userId;
      newUserProfile.userName = userName;
      newUserProfile.status = Status.Active;
      newUserProfile.socials.push(socialId);
      userIds.push(userId);
    }
  }

  function addSocialInUser(bytes32 userId, bytes32 socialId) public {
    require(isInUserIds(userId));
    if (!(isSocialInUser(userId, socialId))) {
      users[userId].socials.push(socialId);
    }
  }

  function updateUser(bytes32 userId, bytes32 userName, uint statusId, bytes32 socialId) public {
    require(isInUserIds(userId));
    var newUserProfile = users[userId];
    newUserProfile.userName = userName;
    newUserProfile.status = idToStatus[statusId];
    addSocialInUser(userId, socialId);
  }




}