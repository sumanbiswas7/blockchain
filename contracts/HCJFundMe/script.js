import { ethers } from "./ethers-5.2.umd.min.js";
import { abi, contractAddress } from "./constants.js";
const connectButton = document.getElementById("connect");
const fundmeButton = document.getElementById("fundme");
const balanceButton = document.getElementById("balance");
const withdrawButton = document.getElementById("withdraw");
connectButton.onclick = handleConnectClick;
fundmeButton.onclick = handleFundmeClick;
balanceButton.onclick = handleBalanceCheck;
withdrawButton.onclick = handleWithdraw;

intitial();
function intitial() {
  if (window.ethereum) {
    console.log("Metamask detected");
  } else {
    connectButton.innerText = "Install Metamask";
    console.log("No Metamask detected");
  }
}

async function handleConnectClick() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  connectButton.innerText = "Connected";
}

async function handleFundmeClick() {
  if (window.ethereum) {
    const ethAmountValue = document.getElementById("ethamount").value;
    const ethAmount = ethers.utils.parseEther(ethAmountValue);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer); // Metamask and Contract connected
    try {
      const transactionResponse = await contract.fund({
        value: ethAmount,
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log("Transaction Sucessfull");
    } catch (error) {
      console.log(error);
      console.log("Transaction Failed");
    }
  }
}

async function handleBalanceCheck() {
  console.log("Checking balance ...");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const balance = await provider.getBalance(contractAddress);
  const balanceInETH = ethers.utils.formatEther(balance);
  console.log(`Available balance - ${balanceInETH} ETH`);
}

async function handleWithdraw() {
  console.log("Withdrawing funds");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  try {
    const transactionResponse = await contract.withdraw();
    listenForTransactionMine(transactionResponse, provider);
    console.log(`withdraw sucessfull`);
  } catch (error) {
    console.log(`withdraw err - ${error}`);
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(`${transactionReceipt.confirmations} - blocks confirmed`);
      resolve();
    });
  });
}
