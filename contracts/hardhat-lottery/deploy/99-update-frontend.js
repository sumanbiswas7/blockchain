const fs = require("fs");
const { network, ethers } = require("hardhat");

module.exports = async () => {
  await updateContractAddress();
  await updateAbi();
};

async function updateContractAddress() {
  console.log("updating contract-addresses ...");

  const FRONTEND_ADDRESS_PATH = "./frontend/contractAddress.json";
  const raffle = await ethers.getContract("Raffle");
  const chainId = network.config.chainId.toString();
  const contractAddresses = JSON.parse(
    fs.readFileSync(FRONTEND_ADDRESS_PATH, "utf8")
  );

  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId].includes(raffle.address)) {
      contractAddresses[chainId].push(raffle.address);
    }
  } else {
    contractAddresses[chainId] = [raffle.address];
  }

  fs.writeFileSync(FRONTEND_ADDRESS_PATH, JSON.stringify(contractAddresses));
}
async function updateAbi() {
  console.log("updating contract-interface/abi ...");

  const FRONTEND_ABI_PATH = "./frontend/abi.json";
  const raffle = await ethers.getContract("Raffle");
  fs.writeFileSync(
    FRONTEND_ABI_PATH,
    raffle.interface.format(ethers.utils.FormatTypes.json)
  );
}
