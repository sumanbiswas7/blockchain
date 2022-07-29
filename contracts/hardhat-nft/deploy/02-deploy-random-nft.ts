import { ethers, network } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../helper.hardhat.config";


const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    const config = networkConfig[chainId as keyof typeof networkConfig];
    let vrfCoordinatorV2Address, subscriptionId;

    let tokenUris = [
        "ipfs://QmaVkBn2tKmjbhphU7eyztbvSQU5EXDdqRyXZtRhSGgJGo",
        "ipfs://QmYQC5aGZu2PTH8XzbJrbDnvhj3gVs7ya33H9mqUNvST3d",
        "ipfs://QmZYmH5iDbD6v3U2ixoVAjioSzvWJszDzYdbeCLquGSpVm",
    ]

    console.log("::::: deploying random-nft ...")

    if (chainId == 31337) {
        const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock");
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address;
        const txRes = await vrfCoordinatorV2Mock.createSubscription();
        const receipt = await txRes.wait(1)
        subscriptionId = receipt.events[0].args.subId;

    } else {
        vrfCoordinatorV2Address = config["vrfCoordinatorV2" as keyof typeof config];
        subscriptionId = config["subscriptionId" as keyof typeof config];
    }

    const gasLane = config["gasLane"];
    const callbackGasLimit = config["callbackGasLimit"];
    const mintFee = config["mintFee"];

    await deploy("RandomNft", {
        from: deployer,
        args: [vrfCoordinatorV2Address, subscriptionId, gasLane, callbackGasLimit, tokenUris, mintFee],
        log: true
    })

}

deployFunction.tags = ["all", "random-nft"]
export default deployFunction;

