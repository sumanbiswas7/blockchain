import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts();
    console.log("::::: Minting svg-nft ...")
    const svgNft = await ethers.getContract("SvgNft", deployer);
    const mintSvgNft: any = await svgNft.mintNft();
    await mintSvgNft.wait(1);
    // console.log(`Basic NFT index 0 tokenURI: ${await mintSvgNft.tokenURI(0)}`)
    console.log("---------------------------------------")
}

deployFunction.tags = ["all", "svg-nft"]
export default deployFunction;  