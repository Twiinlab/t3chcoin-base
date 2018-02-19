pragma solidity 0.4.18;

contract T3chcoin {

  enum MessageTypes {Twit, TwitLike, TwitRetweet }
  MessageTypes[] private idToMessageTypes = [ MessageTypes.Twit, MessageTypes.TwitLike, MessageTypes.TwitRetweet];
  enum Status {Pending, Active, Blocked }
  Status[] private idToStatus = [ Status.Pending, Status.Active, Status.Blocked];
  
  struct ItemDetail {
    bytes32 description;
    uint256 price;
  }

  struct BalanceDetail {
    bytes32 userId;
    uint256 tokens;
  }
  
  struct MessageDetail {
    bytes32 message;
    MessageTypes messageType;
  }

  struct SocialProfile {
    bytes32 socialId;
    bytes32 userId;
    uint totalAll;
    uint totalTwit;
    uint totalTwitLike;
    uint totalTwitRetweet;
    MessageDetail[] messages;
  }

  struct UserProfile {
    bytes32 userId;
    bytes32 userName;
    bytes32 avatar;
    bytes32 selectedItem;
    Status status;
    bytes32[] socials;
  }

  address public owner;
  bytes32 public name;
  mapping(bytes32 => uint256) balances;

  mapping(bytes32 => SocialProfile) socials;
  bytes32[] socialIds;

  mapping(bytes32 => bytes32[]) userItems;
  mapping(bytes32 => UserProfile) users;
  bytes32[] userIds;

  mapping(bytes32 => ItemDetail) catalog;  
  bytes32[] itemIds;
  
  event NewMessageEvent(bytes32 socialId, bytes32 message, uint messageTypeIndex);

  function T3chcoin(bytes32 platformName) public {
    name = platformName;
    owner = tx.origin;
    initCatalog(10);
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

  function balanceOf(bytes32 userId) public view returns(uint) {
    return balances[userId];
  }

  function getCatalog() public view returns( bytes32[] ) {
    return itemIds;
  }

  function getItemDetail(bytes32 itemId) public view returns(bytes32, uint) {
    var item = catalog[itemId];
    return (item.description, item.price);
  }

  function initCatalog(uint32 catalogSize) private {  
    for (uint32 i = 0; i < catalogSize; i++) {
      itemIds.push(bytes32(i));
      var itemCatalog = catalog[bytes32(i)];
      itemCatalog.description = bytes32(i);
      itemCatalog.price = i;
    }
  }

  function addSocial(bytes32 socialId) public {
    if (!isInSocialIds(socialId)) {
      var newSocialProfile = socials[socialId];
      newSocialProfile.socialId = socialId;
      newSocialProfile.totalAll = 0;
      newSocialProfile.totalTwit = 0;
      newSocialProfile.totalTwitLike = 0;
      newSocialProfile.totalTwitRetweet = 0;
      socialIds.push(socialId);
    }
  }

  function addSocialMessage(bytes32 socialId, bytes32 message, uint messageTypeIndex) public {
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
    rewardTokensFromSocialId(socialId);
    socials[socialId].messages.push(MessageDetail(message,mt));
    NewMessageEvent(socialId, message, messageTypeIndex);
  }

  function assignSocialToUser(bytes32 socialId, bytes32 userId) public {
    if (!isInSocialIds(socialId)) {
      addSocial(socialId);
    } 
    var newSocialProfile = socials[socialId];
    newSocialProfile.userId = userId;
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

  function rewardTokensFromSocialId(bytes32 socialId) public {
    if (isInSocialIds(socialId)) {
      var socialProfile = socials[socialId];
      if (socialProfile.userId != 0) {
        balances[socialProfile.userId]++;
      }
    }
  }

  function rewardTokensFromNewUser(bytes32 socialId) public {
    if (isInSocialIds(socialId)) {
      var socialProfile = socials[socialId];
      if (socialProfile.userId != 0) {
        balances[socialProfile.userId] = socialProfile.totalAll;
      }
    }
  }

  function getUserProfileById(bytes32 userId) public view returns( bytes32, bytes32, bytes32, bytes32, uint, uint ) {
    return (userId,
            users[userId].userName,
            users[userId].avatar,
            users[userId].selectedItem,            
            balances[userId],
            userItems[userId].length);
  }

  function getUserItemsById(bytes32 userId) public view returns( bytes32[] ) {
    return userItems[userId];
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
      assignSocialToUser(socialId, userId);
      rewardTokensFromNewUser(socialId);
    }
  }

  function buyItem(bytes32 userId, bytes32 itemId) public {
    // var itemCatalog = catalog[itemId];
    var myItems = userItems[userId];
    myItems.push(itemId);
    // if (balances[userId] > itemCatalog.price) {
    //   balances[userId] -= itemCatalog.price;
    //   var myItems = userItems[userId];
    //   myItems.push(itemId);
    // }
  }

  function addSocialInUser(bytes32 userId, bytes32 socialId) public {
    require(isInUserIds(userId));
    if (!(isSocialInUser(userId, socialId))) {
      users[userId].socials.push(socialId);
    }
  }

  function updateUser(bytes32 userId, bytes32 userName, bytes32 avatar, bytes32 selectedItem) public {
    require(isInUserIds(userId));
    var newUserProfile = users[userId];
    newUserProfile.userName = userName;
    newUserProfile.avatar = avatar;
    newUserProfile.selectedItem = selectedItem;
  }

  //return array with top N user tokens
  function getTopUsers(uint resultCount) public view returns( bytes32[] ) {
    var result = new BalanceDetail[](resultCount);
    for (uint i = 0; i < userIds.length; i++) {
      var userId = userIds[i];
      var tokenBalance = balances[userId];
      if (i < resultCount) {
        var balanceDetail = result[i];
        balanceDetail.tokens = tokenBalance;
        balanceDetail.userId = userId;
      } else {
        for (uint j = 0; j < result.length; j++) {
          var item = result[j];
          if (item.tokens < tokenBalance) {
            item.tokens = tokenBalance;
            item.userId = userId;
            break;
          }
        }
      }
    }
    var flatResult = new bytes32[](resultCount);
    var userListCount = resultCount > userIds.length ? userIds.length : resultCount;
    for (uint z = 0; z < userListCount; z++) {
      if (z < (result.length - 1) ) {
        flatResult[z] = result[z].userId;
      } else {
        flatResult[z] = "";
      }
    }
    return flatResult;
  }


}