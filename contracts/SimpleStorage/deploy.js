const ethers = require("ethers");
const fs = require("fs");
const ACC_PRIVATE_KEY =
  "34c7c7906a9108244fb9b1905008a2037a83976ac0a3a696896e7f44489b9637";

async function main() {
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const bytecode = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8"
  );
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(ACC_PRIVATE_KEY, provider);
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
