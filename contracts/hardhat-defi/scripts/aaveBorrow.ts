import { AMOUNT, getWeth } from "./getWeth";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { BigNumber } from "ethers";
async function main() {
    const { deployer } = await getNamedAccounts();
    const { deploy } = deployments;

    const LendingPool = await getLendingPoolAddress();
    const LendingPoolAddress = LendingPool.address;

    await approveERC20(LendingPoolAddress, AMOUNT, deployer);

}

async function getLendingPoolAddress() {
    // LendingPoolAddressesProvider address -> 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    const LendingPoolAddressesProvider = await ethers.getContractAt("ILendingPoolAddressesProvider", "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5")
    const LendingPoolAddress = await LendingPoolAddressesProvider.getLendingPool();

    const LendingPool = await ethers.getContractAt("ILendingPool", LendingPoolAddress)
    return LendingPool;
}

async function approveERC20(spenderAddress: string, amountToSpend: BigNumber, account: any) {
    // ERC20Address -> 0xd0a1e359811322d97991e03f863a0c30c2cf029c
    const erc20Token = await ethers.getContractAt("IERC20", "0xd0a1e359811322d97991e03f863a0c30c2cf029c")
    const tx = await erc20Token.approve(spenderAddress, amountToSpend);
    await tx.wait(1);
    console.log("Approved")
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
})