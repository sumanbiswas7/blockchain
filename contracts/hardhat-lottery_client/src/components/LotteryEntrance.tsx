import { abi, addresses } from "../constants/index";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const [lotteryFee, setLotteryFee] = useState(null);
  const [fee, setFee] = useState(null);
  const [recentWinner, setRecentWinner] = useState("0");
  const [numberOfPlayers, setNumberOfPlayers] = useState("0");
  const dispatch = useNotification();

  const chainId = parseInt(chainIdHex as string);
  const contractAddress: any =
    chainId in addresses ? addresses[chainId][0] : null;

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi,
    contractAddress: contractAddress,
    functionName: "getEntranceFee",
    params: {},
  });
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi,
    contractAddress: contractAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: lotteryFee!,
  });
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi,
    contractAddress: contractAddress,
    functionName: "getRecentWinner",
    params: {},
  });
  const { runContractFunction: getTotalPlayers } = useWeb3Contract({
    abi,
    contractAddress: contractAddress,
    functionName: "getTotalPlayers",
    params: {},
  });

  useEffect(() => {
    updateUI();
  }, [isWeb3Enabled]);

  async function handleSucess(tx: any) {
    dispatch({
      type: "success",
      position: "bottomR",
      icon: "messageCircle",
      title: "Loading",
      message: "Transaction Sucessfull",
    });
    await tx.wait(1);
    updateUI();
  }
  async function handleError() {
    dispatch({
      type: "error",
      position: "bottomR",
      icon: "exclamation",
      title: "Transaction Failed",
      message: "Failed to enter the lottery",
    });
    updateUI();
  }

  async function updateUI() {
    const entranceFee: any = await getEntranceFee();
    const totalPlayers: any = await getTotalPlayers();
    const recWinner: any = await getRecentWinner();
    const ethAmount: any =
      parseInt(entranceFee.toString()) / 1000000000000000000;

    setLotteryFee(entranceFee.toString());
    setFee(ethAmount);
    setRecentWinner(recWinner.toString());
    setNumberOfPlayers(totalPlayers.toString());
  }

  return (
    <div>
      <button
        onClick={() =>
          enterRaffle({
            onSuccess: handleSucess,
            onError: handleError,
          }) as any
        }
      >
        Enter Raffle
      </button>
      <p>Entrance Fee - {fee} ETH</p>
      <p>Total Players - {numberOfPlayers}</p>
      <h3>Recent Winner</h3>
      <p>{recentWinner}</p>
    </div>
  );
}
