const { network } = require("hardhat");
const { networkConfig, devChains } = require("../hardhat.network.config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  let ethToUsdAddress;

  if (devChains.includes(network.name)) {
    const mockV3Aggregator = await get("MockV3Aggregator");
    ethToUsdAddress = mockV3Aggregator.address;
  } else {
    ethToUsdAddress = networkConfig[chainId]["ethToUsdAddress"];
  }

  console.log(`deploying from - ${deployer}`);
  const fundMe = await deploy("FundMe", {
    from: deployer,
    log: true,
    args: [ethToUsdAddress],
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  console.log(`Success ${fundMe}`);

  if (!devChains.includes(network.name)) {
    verify(fundMe.address, [ethToUsdAddress]);
  }
};

module.exports.tags = ["all", "fundme"];
