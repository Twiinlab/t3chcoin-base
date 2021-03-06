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
    gcloud: {
      host: '35.229.121.201',
      port: 8545,
      network_id: '*', //'1517269283564' // Match any network id
    }
  }
}
