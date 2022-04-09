import { BackgroundImage as BackgroundComponent } from "./components/BackgroundImage";
import { Header } from "./components/Header";
import { MainImages } from "./components/MainImages";
import { GreenBoxesContainer } from "./components/GreenBoxesContainer";
import { Staking } from "./components/Staking";
import BackgroundImage from "./assets/images/Asset 118.png";
import { useState } from "react";
import store from "../src/redux/store";
import { Provider } from "react-redux";
import './App.css';
function App() {
  const [walletAddress, setWalletAddress] = useState("Connect Wallet");
  const handleConnectWallet = () => {
    setWalletAddress("My Wallet");
  };

  return (
    <Provider store={store}>
      <BackgroundComponent
        url={BackgroundImage}
        className="font-lapsus w-screen h-screen overflow-scroll"
      >
        <Header />
        <MainImages />
        <GreenBoxesContainer />
        <Staking />
      </BackgroundComponent>
    </Provider>
  );
}

export default App;
