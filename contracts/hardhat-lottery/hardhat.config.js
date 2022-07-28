require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const ganachePvtKey =
  "3163729ec1195da8fa51b2df3f3b627356c490b15e2b41846c3ec6b0cb87585c";
const rinkbeyMetamaskPvtKey =
  "f05dcc28eaa381873e80bb70a48a1f600b360853f7e95937d191fb7e6014bbb7";

module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [ganachePvtKey],
      blockConfirmations: 1,
    },
    rinkeby: {
      accounts: [rinkbeyMetamaskPvtKey],
      url: "https://eth-rinkeby.alchemyapi.io/v2/lwOOuA14JM4qsQFohBM2-L1WxLtjDFxG",
      chainId: 4,
    },
  },
  namedAccounts: {
    deployer: {
      default: 1,
    },
    player: {
      default: 1,
    },
  },
};
