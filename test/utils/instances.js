
import { MessageTypes } from './enums';
const T3chcoin = artifacts.require('T3chcoin');

const T3chcoinDefault = {
    // name: 'T3chcoinDefault'
};

async function getTwit() {
    return { socialId: 'socialId', message: 'message', messageTypeIndex: MessageTypes.Twit };
}

async function getUser() {
    return { userId: 'userId', userName: 'userName', socialId: 'socialId' };
}

async function getT3chcoinInstance() {
    return await T3chcoin.new();
}

export {
    getT3chcoinInstance,
    getTwit,
    getUser
}