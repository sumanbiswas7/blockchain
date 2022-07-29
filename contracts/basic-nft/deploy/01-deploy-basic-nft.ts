import { network, ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types"


const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    console.log("::::: deploying basic-nft ...")

    await deploy("BasicNft", {
        from: deployer,
        log: true,
    })

    console.log("---------------------------------------")
}

deployFunction.tags = ["all", "basic-nft"]
export default deployFunction;

