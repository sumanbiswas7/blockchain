module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(`deploying from - ${deployer}`);

  const fundMe = await deploy("FundMe", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  console.log(`Success ${fundMe}`);
};
