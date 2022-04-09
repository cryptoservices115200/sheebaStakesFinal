import { ConnectWalletButton } from "./ConnectWalletButton";
import Logo from "../assets/images/Asset 102.png";
import Web3modal from "../Utils/walletInteract";
export const Header = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-2.5 px-5">
      <img src={Logo} alt="logo" className="object-cover w-80" />
      <Web3modal />
    </div>
  );
};
