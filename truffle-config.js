const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');
require('babel-register');
require('babel-polyfill');
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    inf_Cool1_ropsten: {
      network_id: 3,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Cloudsan\\Desktop\\Eth Learn\\defi_tutorial\\MonRopsten.env', 'utf-8'), "https://ropsten.infura.io/v3/ce374f1d6c26442981c2f6ab45414968")
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './build/contracts',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "petersburg"
    }
  }
};
