import { instances } from './utils';

var expect = require('chai').expect;

const Course = artifacts.require('Course');

contract('T3chcoin', function (accounts) {

  const manager = accounts[0];
  const teacher = accounts[1];
  const student1 = accounts[2];

  it('should constructor init Campus Name', async function () {
    const t3chcoing = await instances.getT3chcoinInstance();
    const result = await t3chcoing.isInSocialIds.call();
    expect(name).to.equal(false);
  });

});