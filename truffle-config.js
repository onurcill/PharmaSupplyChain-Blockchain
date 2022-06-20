module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      from: '0xFAff0d2C3439E918317c31F56bDc5f0de72057ec',
    },
  },
  contracts_directory: './testing/',
  contracts_build_directory: './src/build/',
  compilers: {
    solc: {
      version: "0.6.6",
      settings: {
        optimizer: {
          enabled: true,
          runs: 100
        }
      }
    }
  }
}