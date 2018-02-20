require('babel-register');
require('babel-polyfill');

//curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[]}' http://localhost:8545
module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', //'1517269283564' // Match any network id
    },
    kubernetes: {
      host: '192.168.1.133',
      port: 8545,
      network_id: '*', //'1517269283564' // Match any network id
    }
  }
}
