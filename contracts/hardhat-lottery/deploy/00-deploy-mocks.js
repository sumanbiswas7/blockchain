const { getNamedAccounts, deployments, network, ethers } = require("hardhat");
const { devChains } = require("../hardhat.network.config");

const BASE_FEE = "250000000000000000"; // 0.25 is this the premium in LINK?
const GAS_PRICE_LINK = 1e9; // link per gas, is this the gas lane? // 0.000000001 LINK per gas

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  if (devChains.includes(network.name)) {
    log("deploying mocks ...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      args: [BASE_FEE, GAS_PRICE_LINK],
      log: true,
    });
  }
  log("----------------------------------------------------------");
};

module.exports.tags = ["all", "mocks"];
