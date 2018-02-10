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

  it('should addSocial new twit', async function () {
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.addSocial(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultGetSocial = await t3chcoing.getSocialProfileById.call(twit.socialId);
    expect(libs.parseHexToStr(resultGetSocial[0])).to.equal(twit.socialId);
    expect(resultGetSocial[1].toNumber()).to.equal(1);
    
  });

  it('should getSocialIdsCount return socialIds count', async function () {
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.addSocial(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultGetTopSocials = await t3chcoing.getSocialIdsCount.call();
    expect(resultGetTopSocials.toNumber()).to.equal(1);
  });

  it('should getTopSocials return top social Ids', async function () {
    const length = 20;
    const twit = await instances.getTwit();
    const t3chcoing = await instances.getT3chcoinInstance();
    const resultSocial1 = await t3chcoing.addSocial(twit.socialId, twit.message, twit.messageTypeIndex);
    const resultSocial2 = await t3chcoing.addSocial('socialId2', twit.message, twit.messageTypeIndex);
    const resultGetTopSocials = await t3chcoing.getTopSocials.call(length);
    expect(resultGetTopSocials.length).to.equal(length);
    expect(libs.parseHexToStr(resultGetTopSocials[0])).to.equal(twit.socialId);
  });

});