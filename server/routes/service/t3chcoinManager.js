
const Web3 = require('web3');
const contract = require('truffle-contract');
const t3chcoinArtifacts = require('../../../build/contracts/T3chcoin.json');
const config = require('../../config');
const libs = require('../../utils/libs');
const { User, Social, Item } = require('../../models');


web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
T3chcoinContract = contract(t3chcoinArtifacts);
T3chcoinContract.setProvider(web3.currentProvider);

const getTopSocials = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var socials = (await contractInstance.getTopSocials.call(10)).map(libs.parseHexToStr);
  return await Promise.all(socials.map(async (socialId) => {
      return new Social(await contractInstance.getSocialProfileById.call(socialId)).toJson();
  }));
}

const getUserTopList = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var users = (await contractInstance.getTopUsers.call(10)).map(libs.parseHexToStr);
  return await Promise.all(users.map(async (user) => {
      return new User(await contractInstance.getUserProfileById.call(user)).toJson();
  }));
}

const getUser = async (userId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var user = new User(await contractInstance.getUserProfileById.call(userId));
  user.setItems(await contractInstance.getUserItemsById.call(userId));
  return user.toJson();
}

const addUser = async (userId, userName, socialId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.addUser(userId, userName, socialId);
  return true;
}

const buyItem = async (userId, itemId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.buyItem(userId, itemId);
  return true;
}

const addSocialMessage = async (socialId, message, messageTypeIndex) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.addSocialMessage(socialId, message, messageTypeIndex);
  return true;
}

const getItemCatalogList = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var catalog = (await contractInstance.getCatalog.call());
  return await Promise.all(catalog.map(async (itemId) => {
    var itemData = await contractInstance.getItemDetail.call(itemId);
    itemData[2] = itemId;
    return (new Item(itemData ).toJson());
  }));
}

module.exports = {
    getUserTopList,
    getUser,
    getTopSocials,
    addUser,
    buyItem,
    addSocialMessage,
    getItemCatalogList
};