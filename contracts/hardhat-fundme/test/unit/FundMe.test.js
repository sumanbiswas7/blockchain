const { deployments, getNamedAccounts, ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("FundMe", async () => {
  let deployer;
  let fundMe;
  let mockV3Aggregator;
  let sendValue;

  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
    sendValue = ethers.utils.parseEther("1");
  });

  describe("constructor", async () => {
    it("sets the aggregator address correctly", async () => {
      const response = await fundMe.priceFeed();
      assert.equal(response, mockV3Aggregator.address);
    });

    it("Fails if not enough ethers sent", async () => {
      await expect(fundMe.fund());
    });

    it("updated the amounts funded data-structure", async () => {
      await fundMe.fund({ value: sendValue });
      const response = await fundMe.addressToAmountFunded(deployer.address);
      assert.equal(response, sendValue);
    });
  });
});
