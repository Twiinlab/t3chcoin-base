
const Web3 = require('web3');
const contract = require('truffle-contract');
const t3chcoinArtifacts = require('../../build/contracts/T3chcoin.json');
const config = require('../config');
const libs = require('../utils/libs');
const { User, Social, Item } = require('../models');

web3 = new Web3(new Web3.providers.HttpProvider(config.blockchain.provider));
T3chcoinContract = contract(t3chcoinArtifacts);
T3chcoinContract.setProvider(web3.currentProvider);
T3chcoinContract.web3.eth.defaultAccount= web3.eth.accounts[0];

const getTopSocials = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var socials = (await contractInstance.getTopSocials.call(10)).map(libs.parseHexToStr);
  return await Promise.all(socials.map(async (socialId) => {
      return new Social(await contractInstance.getSocialProfileById.call(socialId)).toJson();
  }));
}

const getTopFillSocials = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var socials = (await contractInstance.getTopSocials.call(10)).map(libs.parseHexToStr);
  return await Promise.all(socials.map(async (socialId) => {
       let social = new Social(await contractInstance.getSocialProfileById.call(socialId)).toJson();
       social.user = new User(await contractInstance.getUserProfileById.call(socialId)).toJson();
       return social;
  }));
}

const getSocial = async (socialId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  return new Social(await await contractInstance.getSocialProfileById.call(socialId));
}

const getUserTopList = async () => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var users = (await contractInstance.getTopUsers.call(10)).map(libs.parseHexToStr);
  return await Promise.all(users.map(async (userId) => {
      var user = new User(await contractInstance.getUserProfileById.call(userId)).toJson();
      user.userId = userId;
      return user;
  }));
}

const getUser = async (userId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var user = new User(await contractInstance.getUserProfileById.call(userId));
  user.userId = userId;
  user.setItems(await contractInstance.getUserItemsById.call(userId));
  return user.toJson();
}

const addUser = async (userId, userName, socialId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.addUser(userId, userName, socialId, { gas:3000000 });
  return true;
}

const updateUser = async (userId, userName, avatar, selectedItem) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.updateUser(userId, userName, avatar, selectedItem,  { gas:3000000 });
  return true;
}

const buyItem = async (userId, itemId) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.buyItem(userId, itemId);
  return true;
}

const addSocialMessage = async (socialId, message, messageTypeIndex) => {
  var contractInstance =  await T3chcoinContract.at(config.getSmartContractInstance());
  var result = await contractInstance.addSocialMessage(socialId, message, messageTypeIndex, { gas:3000000 });
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

function setSmartContractInstance(newInstanceAddress) {
  return config.setSmartContractInstance(newInstanceAddress);
}

function getSmartContractInstance() {
  return config.getSmartContractInstance();
}

module.exports = {
    getUserTopList,
    getUser,
    updateUser,
    getTopSocials,
    getTopFillSocials,
    getSocial,
    addUser,
    buyItem,
    addSocialMessage,
    getItemCatalogList,
    setSmartContractInstance,
    getSmartContractInstance
};