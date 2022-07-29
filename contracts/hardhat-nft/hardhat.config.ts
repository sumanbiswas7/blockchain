import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.7" }, { version: "0.6.6" }, { version: "0.8.0" }]
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
};

export default config;
