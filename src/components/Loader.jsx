import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-[500px] w-[500px]">
      <div className="dark:text-white text-gray-800">Loading...</div>
      <AiOutlineLoading3Quarters
        className="w-6 h-6 animate-spin
                  dark:text-white
                  text-gray-800"
      />
    </div>
  );
};

export default Loader;
