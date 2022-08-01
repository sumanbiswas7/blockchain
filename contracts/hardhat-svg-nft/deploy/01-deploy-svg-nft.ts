import { DeployFunction } from "hardhat-deploy/types"
import fs from "fs"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const svg = await fs.readFileSync("./images/happy.svg", "utf-8");
  console.log("::::: deploying svg-nft ...")

  await deploy("SvgNft", {
    from: "f05dcc28eaa381873e80bb70a48a1f600b360853f7e95937d191fb7e6014bbb7",
    args: [svg],
    log: true,
  })

  console.log("---------------------------------------")
}

deployFunction.tags = ["all", "svg-nft"]
export default deployFunction;