const { network, ethers } = require("hardhat");
const { devChains, networkConfig } = require("../hardhat.network.config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;
  const chainId = network.config.chainId;
  let VRFCoordinatorV2Address, subscriptionId;

  if (devChains.includes(network.name)) {
    const VRFCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    VRFCoordinatorV2Address = VRFCoordinatorV2Mock.address;
    // Creating subcription in dev env
    const transactionResponse = await VRFCoordinatorV2Mock.createSubscription();
    const transactionReceipt = await transactionResponse.wait();
    subscriptionId = transactionReceipt.events[0].args.subId;
  } else {
    VRFCoordinatorV2Address = networkConfig[chainId]["vrfCoordinatorV2"];
  }

  await deploy("Raffle", {
    from: deployer,
    args: [
      VRFCoordinatorV2Address,
      networkConfig[chainId]["raffleEntranceFee"],
      networkConfig[chainId]["gasLane"],
      subscriptionId,
      networkConfig[chainId]["callbackGasLimit"],
      networkConfig[chainId]["keepersUpdateInterval"],
    ],
    log: true,
  });
};

module.exports.tags = ["all", "raffle"];
