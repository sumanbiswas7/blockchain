import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export function ManualConnectButton() {
  const {
    enableWeb3,
    account,
    Moralis,
    deactivateWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  const [buttonText, setButtonText] = useState<"Connected" | "Connect Wallet">(
    "Connect Wallet"
  );

  useEffect(() => {
    if (window.localStorage.getItem("connected") != null) {
      enableWeb3();
      setButtonText("Connected");
    }
    Moralis.onAccountChanged(() => {
      console.log(`account changed to ${account}`);
      disconnectWallet();
    });
  }, [isWeb3Enabled]);

  async function connectWallet() {
    try {
      await enableWeb3();
      window.localStorage.setItem("connected", "injected");
      setButtonText("Connected");
    } catch (error) {
      console.error(error);
    }
  }
  async function disconnectWallet() {
    try {
      await deactivateWeb3();
      window.localStorage.removeItem("connected");
      setButtonText("Connect Wallet");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={connectWallet} disabled={isWeb3EnableLoading}>
        {buttonText}
      </button>
      {account && <p>Connected to - {account}</p>}
    </div>
  );
}
