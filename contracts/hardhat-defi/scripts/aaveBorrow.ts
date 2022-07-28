import { getWeth } from "./getWeth";
import { deployments, ethers, getNamedAccounts } from "hardhat";
async function main() {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;
    // 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    const LendingPoolAddressesProvider = await ethers.getContractAt("LendingPoolAddressesProvider", "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5", deployer)
    console.log(LendingPoolAddressesProvider)

}


main().catch((err) => {
    console.log(err);
    process.exit(1);
})