'use strict';

import 'babel-polyfill';
const chai = require('chai');  
var expect = require('chai').expect;
import { instances, enums } from './utils/';
import * as libs from '../server/utils/libs';


const T3chcoin = artifacts.require('T3chcoin');

contract('T3chcoin', function (accounts) {

  const user = accounts[0];

  it('should constructor init T3chcoin', async function () {
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.owner.call();
    expect(result).to.exist;
  });

  it('should addSocialMessage new twit', async function () {
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultGetSocial = await t3chcoing.getSocialProfileById.call(twit.socialId);
    expect(libs.parseHexToStr(resultGetSocial[0])).to.equal(twit.socialId);
    expect(resultGetSocial[1].toNumber()).to.equal(1);
    
  });

  it('should getSocialIdsCount return socialIds count', async function () {
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultGetTopSocials = await t3chcoing.getSocialIdsCount.call();
    expect(resultGetTopSocials.toNumber()).to.equal(1);
  });

  it('should getTopSocials return top social Ids', async function () {
    const length = 20;
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultSocial1 = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultSocial2 = await t3chcoing.addSocialMessage('socialId2', twit.message, twit.messageTypeIndex);
    const resultGetTopSocials = await t3chcoing.getTopSocials.call(length);
    expect(resultGetTopSocials.length).to.equal(length);
    expect(libs.parseHexToStr(resultGetTopSocials[0])).to.equal(twit.socialId);
  });

  it('should AddUser create new user with balance', async function () {
    const length = 20;
    const twit = await instances.getTwit();
    const user = await instances.getUser();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultSocial1 = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultSocial2 = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);    
    const resultGetTopSocials = await t3chcoing.addUser(user.userId,user.userName, twit.socialId);
    const resultTokens = await t3chcoing.balanceOf.call(user.userId);
    expect(resultTokens.toNumber()).to.equal(2);
  });

  it('should increase tokens when social interactions (revert order)', async function () {
    const length = 20;
    const twit = await instances.getTwit();
    const user = await instances.getUser();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultGetTopSocials = await t3chcoing.addUser(user.userId,user.userName, twit.socialId);
    const resultSocial1 = await t3chcoing.addSocialMessage(twit.socialId, twit.message, twit.messageTypeIndex);    
    const resultTokens = await t3chcoing.balanceOf.call(user.userId);
    expect(resultTokens.toNumber()).to.equal(1);
  });

  it('should getTopUsers return top token user list', async function () {
    const length = 20;
    const twit = await instances.getTwit();
    const user = await instances.getUser();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultGetTopSocials1 = await t3chcoing.addUser('userId1','userName1', 'socialId1');
    const resultSocial1 = await t3chcoing.addSocialMessage('socialId1', twit.message, twit.messageTypeIndex);  
    const resultGetTopSocials2 = await t3chcoing.addUser('userId2','userName1', 'socialId2');    
    const resultSocial2 = await t3chcoing.addSocialMessage('socialId2', twit.message, twit.messageTypeIndex);    
    const resultTokens = await t3chcoing.getTopUsers.call(length);
    expect(resultTokens.length).to.equal(length);
  });

  it('should getUserProfileById return user detail', async function () {
    const twit = await instances.getTwit();
    const user = await instances.getUser();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultGetTopSocials1 = await t3chcoing.addUser('userId1','userName1', 'socialId1');
    const resultSocial1 = await t3chcoing.addSocialMessage('socialId1', twit.message, twit.messageTypeIndex);     
    const resultUserDetail = await t3chcoing.getUserProfileById.call('userId1');
    expect(resultUserDetail.length).to.equal(5);
  });

  it('should buyItem add item to user', async function () {
    const twit = await instances.getTwit();
    const user = await instances.getUser();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultGetTopSocials1 = await t3chcoing.addUser('userId1','userName1', 'socialId1');
    const resultSocial1 = await t3chcoing.addSocialMessage('socialId1', twit.message, twit.messageTypeIndex);    
    const resultBuy = await t3chcoing.buyItem('userId1','1');    
    const resultUserDetail = await t3chcoing.getUserProfileById.call('userId1');
    const resultUserItems = await t3chcoing.getUserItemsById.call('userId1');    
    expect(resultUserDetail.length).to.equal(5);
    expect(resultUserDetail[4].toNumber()).to.equal(resultUserItems.length);
  });

  it('should getCatalog return catalog', async function () {
    const t3chcoing = await instances.getT3chcoinInstance();      
    const resultCatalog = await t3chcoing.getCatalog.call();
    console.log("resultCatalog ", resultCatalog.length);
    expect(resultCatalog.length).to.above(0);
  });


});