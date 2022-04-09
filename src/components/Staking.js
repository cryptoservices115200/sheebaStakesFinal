import { useState } from "react";
import StakingImage from "../assets/images/Asset 110.png";
import DepositActiveImage from "../assets/images/Asset 291.png";
import WithdrawActiveImage from "../assets/images/Asset 297.png";
import DepositAmountImage from "../assets/images/Asset 109.png";
import GreenButton from "../assets/images/Asset 286.png";
import { StakingButton } from "./StakingButton";
import { WoodBoxes } from "./woodBoxes";
import { woodBoxesInitialState } from "../data/woodBoxes";

const BUTTONS_CLICK_ACTIONS = {
  DEPOSIT: true,
  WITHDRAW: false,
};

export const Staking = () => {
  const [buttonsState, setButtonsState] = useState({
    isInInitialState: true,
    isDeposit: false,
  });
  const [sheebBalance, setSheebBalance] = useState(32019890098779);
  const [sheebDepositAmount, setSheebDepositAmount] = useState( 0);
  const [woodBoxes, setWoodBoxes] = useState(woodBoxesInitialState);

  const { isInInitialState, isDeposit } = buttonsState;

  const handleButtonClick = (buttonAction) => {
    setButtonsState({
      isInInitialState: false,
      isDeposit: buttonAction,
    });
  };

  const handleDepositClick = () => {};

  const handleDepositAllClick = () => {};

  return (
    <div className="container relative border-8 border-brown p-2.5 pb-10 w-full mx-auto rounded-t-3xl rounded-b text-white text-shadow text-center">
      <img src={StakingImage} alt="staking" className="mx-auto w-52" />
      <div
        className="mx-auto w-72 h-20 bg-contain bg-no-repeat flex items-center text-3xl"
        style={{
          backgroundImage: `url("${
            isDeposit || isInInitialState
              ? DepositActiveImage
              : WithdrawActiveImage
          }")`,
        }}
      >
        <div className="w-11/12 ml-2 flex">
          <button
            className="flex-1 text-shadow"
            onClick={() => handleButtonClick(BUTTONS_CLICK_ACTIONS.DEPOSIT)}
          >
            Deposit
          </button>
          <button
            className="flex-1 text-shadow"
            onClick={() => handleButtonClick(BUTTONS_CLICK_ACTIONS.WITHDRAW)}
          >
            Withdraw
          </button>
        </div>
      </div>
      <h2 className="my-5 text-3xl">SHEEB balance: {sheebBalance}</h2>
      <div
        className="mb-5 w-full bg-cover sm:bg-contain bg-no-repeat bg-center  mx-auto h-auto md:h-12 flex items-center justify-center"
        style={{
          backgroundImage: `url("${DepositAmountImage}")`,
        }}
      >
        <input type={'number'} className="text-brown text-xl custom-input" placeholder={"SHEEBA deposit amount"} value={sheebDepositAmount} onChange={v => setSheebDepositAmount(v.target.value)}/>
      </div>
      <div className="mx-auto h-20 flex gap-10 items-center justify-center flex-col sm:flex-row">
        <StakingButton
          imageURL={GreenButton}
          text="Deposit"
          onClick={handleDepositClick}
        />
        <StakingButton
          imageURL={GreenButton}
          text="Deposit AlL"
          onClick={handleDepositAllClick}
        />
      </div>
      <WoodBoxes boxesState={woodBoxes} />
    </div>
  );
};
