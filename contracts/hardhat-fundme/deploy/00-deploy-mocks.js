const { networkConfig, devChains } = require("../hardhat.network.config");
const { getNamedAccounts, deployments, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const networkName = network.name;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  if (devChains.includes(networkName)) {
    const mock = await deploy("MockV3Aggregator", {
      from: deployer,
      log: true,
      args: [8, 200000000000],
    });
    console.log(`Success ${mock}`);
  }
};

module.exports.tags = ["all", "mocks"];
