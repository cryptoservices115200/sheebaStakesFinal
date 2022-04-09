import { useState } from "react";
import { greenBoxesInitialState } from "../data/greenBoxes";
import { BoxInfo } from "./BoxInfo";
import GreenBox from "../assets/images/Asset 99.png";
import { useSelector } from "react-redux";

export const GreenBoxesContainer = () => {
  const [boxesState, setBoxesState] = useState(greenBoxesInitialState);
  const _totalLockedBalance = useSelector((state) => state.totalLock);
  const _userReward = useSelector((state=>state.userReward))

  return (
    <div className="container px-20 py-2.5 my-5 mx-auto flex flex-wrap justify-center gap-10">
      {[
        { title: "Total Locked", value: parseFloat(_totalLockedBalance).toFixed(2), valueType: "SHEEB" },
        { title: "Total User Rewards", value: _userReward, valueType: "SHEEB" },
        { title: "Token Prices", value: 0, valueType: "$" },
        { title: "APR", value: 0, valueType: "%" },
      ].map(({ title, value, valueType }) => (
        <BoxInfo
          key={title}
          imageSource={GreenBox}
          title={title}
          content={`${value} ${valueType}`}
          className="flex flex-col text-shadow items-center justify-center bg-cover sm:bg-contain bg-no-repeat h-24 w-96 sm:w-72 text-white text-2xl rounded-xl"
        />
      ))}
    </div>
  );
};
