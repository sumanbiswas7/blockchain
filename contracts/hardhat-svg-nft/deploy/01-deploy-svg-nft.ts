import { DeployFunction } from "hardhat-deploy/types"
import fs from "fs"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const svg = await fs.readFileSync("./images/happy.svg", "utf-8");
  console.log("::::: deploying svg-nft ...")

  await deploy("SvgNft", {
    from: deployer,
    args: [svg],
    log: true,
  })

  console.log("---------------------------------------")
}

deployFunction.tags = ["all", "svg-nft"]
export default deployFunction;