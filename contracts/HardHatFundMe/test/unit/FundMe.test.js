const { deployments, getNamedAccounts } = require("hardhat");
const { ethers } = require("hardhat-deploy");
const assert = require("assert");

describe("FundMe", async () => {
  let fundMe;
  let deployer;

  //   beforeEach(async () => {
  //     deployer = await getNamedAccounts().deployer;
  //     await deployments.deploy("FundMe");
  //     fundMe = await ethers.getContract("FundMe", deployer);
  //   });

  describe("test", async () => {
    it("test-1", async () => {
      deployer = await getNamedAccounts().deployer;
      await deployments.deploy("FundMe", {
        from: deployer,
        log: true,
      });
      //   fundMe = await ethers.getContract("FundMe", deployer);
      //   assert.equal("Hii", "Hii");
    });
  });
});
