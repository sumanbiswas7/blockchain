import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"


const rinkbeyMetamaskPvtKey =
  "f05dcc28eaa381873e80bb70a48a1f600b360853f7e95937d191fb7e6014bbb7";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  networks: {
    rinkeby: {
      accounts: [rinkbeyMetamaskPvtKey],
      url: "https://eth-rinkeby.alchemyapi.io/v2/lwOOuA14JM4qsQFohBM2-L1WxLtjDFxG",
      chainId: 4,
    },
    hardhat: {
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
      default: 1
    }
  }
};

export default config;
