const { run } = require("hardhat");

async function verify(contractAddress, args) {
  console.log(`verifying ${contractAddress}`);
  try {
    run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log(`verified sucessfully ${contractAddress}`);
  } catch (e) {
    if (e.message?.toLowerCase().includes("already verified")) {
      console.error("Already Verified");
    } else {
      console.error(e);
    }
  }
}

module.exports = { verify };
