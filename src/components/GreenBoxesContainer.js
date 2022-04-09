import { useState } from 'react';
import { greenBoxesInitialState } from '../data/greenBoxes';
import { BoxInfo } from './BoxInfo';
import GreenBox from '../assets/images/Asset 99.png';

export const GreenBoxesContainer = () => {
  const [boxesState, setBoxesState] = useState(greenBoxesInitialState);

  return (
    <div className="container px-20 py-2.5 my-5 mx-auto flex flex-wrap justify-center gap-10">
      {boxesState.map(({ title, value, valueType }) => (
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
