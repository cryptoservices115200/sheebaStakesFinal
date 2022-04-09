import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import StakingImage from "../assets/images/Asset 110.png";
import DepositActiveImage from "../assets/images/Asset 291.png";
import WithdrawActiveImage from "../assets/images/Asset 297.png";
import DepositAmountImage from "../assets/images/Asset 109.png";
import GreenButton from "../assets/images/Asset 286.png";
import { StakingButton } from "./StakingButton";
import { WoodBoxes } from "./woodBoxes";
import { woodBoxesInitialState } from "../data/woodBoxes";
import { useDispatch, useSelector } from "react-redux";
import {
  approve,
  getReward,
  getTotalLockedBalance,
  getUserBalance,
  getUserDepositedBalance,
  isApproved,
  stake,
  withdraw,
} from "../Utils/walletInteract";
import { SET_REWARD, SET_TOTAL_LOCK } from "../redux/actions";

export const Staking = () => {
  const DEPOSIT = "deposit";
  const WITHDRAW = "withdraw";
  const dispatch = useDispatch();

  const [buttonStatus, setButtonStatus] = useState(DEPOSIT);

  const currentAddress = useSelector((state) => state.address);
  const userReward = useSelector((state) => state.userReward);
  const [userBalance, setUserBalance] = useState(0);
  const [userDepositedBalance, setUserDepositedBalance] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState(false);
  const [sheebDepositAmount, setSheebDepositAmount] = useState(0);

  const handleButtonClick = (buttonAction) => {
    setButtonStatus(buttonAction);
  };

  const handleDepositClick = () => {
    if (approvalStatus) {
      if (sheebDepositAmount === 0) return;
      const transaction = toast.loading("Transaction pending");
      stake(currentAddress, sheebDepositAmount)
        .then((res) => {
          loadContractData();
          toast.update(transaction, {
            render: "Successfully staked",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          if (error.code === 4001) {
            toast.update(transaction, {
              render:
                "MetaMask Tx Signature: User denied transaction signature.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            toast.update(transaction, {
              render: error.message || "Error",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        });
    } else {
      const transaction = toast.loading("Transaction pending");
      approve(currentAddress)
        .then((res) => {
          toast.update(transaction, {
            render: "Successfully approved",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          if (error.code === 4001) {
            toast.update(transaction, {
              render:
                "MetaMask Tx Signature: User denied transaction signature.",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          } else {
            toast.update(transaction, {
              render: error.message || "Error",
              type: "error",
              isLoading: false,
              autoClose: 3000,
            });
          }
        });
    }
  };

  const handleDepositAllClick = () => {
    if (userBalance === 0) return;
    const transaction = toast.loading("Transaction pending");
    stake(currentAddress, userBalance)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully staked all",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const handleWithdrawClick = () => {
    console.log(userDepositedBalance)
    if (sheebDepositAmount === 0 || userDepositedBalance==0 ) return;

    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, sheebDepositAmount)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully withdrawed",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const handleWithdrawAllClick = () => {
    if (userDepositedBalance == 0) return;
    const transaction = toast.loading("Transaction pending");
    withdraw(currentAddress, userDepositedBalance)
      .then((res) => {
        loadContractData();
        toast.update(transaction, {
          render: "Successfully withdrawed all",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.code === 4001) {
          toast.update(transaction, {
            render: "MetaMask Tx Signature: User denied transaction signature.",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        } else {
          toast.update(transaction, {
            render: error.message || "Error",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        }
      });
  };

  const loadContractData = async () => {
    const _balance = await getUserBalance(currentAddress);
    setUserBalance(_balance);
    const _isApproved = await isApproved(currentAddress);
    setApprovalStatus(_isApproved);
    const _userDepositedBalance = await getUserDepositedBalance(currentAddress);
    setUserDepositedBalance(_userDepositedBalance);
    const _totalLockedBalance = await getTotalLockedBalance();
    dispatch({ type: SET_TOTAL_LOCK, payload: _totalLockedBalance });
    const _userReward = await getReward(currentAddress);
    dispatch({ type: SET_REWARD, payload: _userReward });
  };

  useEffect(() => {
    if (currentAddress !== "") {
      loadContractData();
    }
  }, [currentAddress]);

  return (
    <div className="container relative border-8 border-brown p-2.5 pb-10 w-full mx-auto rounded-t-3xl rounded-b text-white text-shadow text-center">
      <img src={StakingImage} alt="staking" className="mx-auto w-52" />
      <div
        className="mx-auto w-72 h-20 bg-contain bg-no-repeat flex items-center text-3xl"
        style={{
          backgroundImage: `url("${
            buttonStatus === DEPOSIT ? DepositActiveImage : WithdrawActiveImage
          }")`,
        }}
      >
        <div className="w-11/12 ml-2 flex">
          <button
            className="flex-1 text-shadow"
            onClick={() => handleButtonClick(DEPOSIT)}
          >
            Deposit
          </button>
          <button
            className="flex-1 text-shadow"
            onClick={() => handleButtonClick(WITHDRAW)}
          >
            Withdraw
          </button>
        </div>
      </div>
      <h2 className="my-5 text-3xl">SHEEB balance: {userBalance}</h2>
      <div
        className="mb-5 w-full bg-cover sm:bg-contain bg-no-repeat bg-center  mx-auto h-auto md:h-12 flex items-center justify-center"
        style={{
          backgroundImage: `url("${DepositAmountImage}")`,
        }}
      >
        <input
          type={"number"}
          className="text-brown text-xl custom-input"
          placeholder={"SHEEBA deposit amount"}
          value={sheebDepositAmount}
          onChange={(v) => setSheebDepositAmount(v.target.value)}
        />
      </div>
      {buttonStatus === DEPOSIT && (
        <div className="mx-auto h-20 flex gap-10 items-center justify-center flex-col sm:flex-row">
          <StakingButton
            imageURL={GreenButton}
            text={approvalStatus ? "Deposit" : "Approve"}
            onClick={handleDepositClick}
          />
          {approvalStatus && (
            <StakingButton
              imageURL={GreenButton}
              text="Deposit All"
              onClick={handleDepositAllClick}
            />
          )}
        </div>
      )}
      {buttonStatus === WITHDRAW && (
        <div className="mx-auto h-20 flex gap-10 items-center justify-center flex-col sm:flex-row">
          <StakingButton
            imageURL={GreenButton}
            text={"Withdraw"}
            onClick={handleWithdrawClick}
          />
          <StakingButton
            imageURL={GreenButton}
            text="Withdraw All"
            onClick={handleWithdrawAllClick}
          />
        </div>
      )}
      <WoodBoxes
        boxesState={[
          { title: "Pending Reward", value: userReward, toFixed: 2 },
          {
            title: "Amount deposited",
            value: userDepositedBalance,
            toFixed: 1,
          },
          { title: "UnLock time", value: 0, toFixed: 0 },
        ]}
      />
      <ToastContainer
        className="text-white"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
