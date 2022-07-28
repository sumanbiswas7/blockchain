import "./App.css";
import { ManualConnectButton } from "./components/ManualConnectButton";
import { ConnectButton } from "web3uikit";
import { LotteryEntrance } from "./components/LotteryEntrance";

function App() {
  return (
    <div className="App">
      {/* <ManualConnectButton /> */}
      <LotteryEntrance />
      <ConnectButton />
    </div>
  );
}

export default App;
