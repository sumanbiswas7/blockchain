const { network, getNamedAccounts, ethers, deployments } = require("hardhat");
const { devChains } = require("../../hardhat.network.config");

!devChains.includes(network.name)
  ? skip.describe
  : describe("Raffel unit tests", async () => {
      let raffle, vrfCoordinatorV2;
      beforeEach(async () => {
        const { deployer } = await getNamedAccounts();
        await deployments.fixture(["all"]);
        raffle = await ethers.getContract("Raffle", deployer);
        vrfCoordinatorV2 = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
      });

      describe("first", async () => {
        console.log(raffle, vrfCoordinatorV2);
      });
    });
