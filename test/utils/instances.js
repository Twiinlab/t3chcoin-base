
const T3chcoin = artifacts.require('T3chcoin');

const T3chcoinDefault = {
    // name: 'T3chcoinDefault'
};

async function getT3chcoinInstance() {
    return await T3chcoin.new();
}