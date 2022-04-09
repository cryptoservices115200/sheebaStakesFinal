import SheebaStakes from '../assets/images/Asset 114.png';
import BannerMessage from '../assets/images/Asset 113.png';

export const MainImages = () => {
  return (
    <div className="mt-5  md:-mt-5 lg:-mt-10">
      <img
        src={SheebaStakes}
        alt="SheebaStakes"
        className="mx-auto sm:h-40 max-w-full"
      />
      <img
        src={BannerMessage}
        alt="SheebaStakes"
        className="mx-auto w-3/4 object-cover xs:w-1/3"
      />
    </div>
  );
};
