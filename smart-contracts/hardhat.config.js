require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

const {
  ALCHEMY_SEPOLIA_RPC = "",
  ALCHEMY_POLYGON_AMOY_RPC = "",
  ALCHEMY_POLYGON_MAINNET_RPC = "",
  PRIVATE_KEY = "",
} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: ALCHEMY_SEPOLIA_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    polygonAmoy: {
      url: ALCHEMY_POLYGON_AMOY_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
    polygon: {
      url: ALCHEMY_POLYGON_MAINNET_RPC,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};
