import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loader = () => {
  return (
    <div className="flex h-[500px] w-[500px] flex-col items-center justify-center gap-4">
      <div className="text-gray-800 dark:text-white">Loading...</div>
      <AiOutlineLoading3Quarters
        className="h-6 w-6 animate-spin
                  text-gray-800
                  dark:text-white"
        aria-hidden="true"
      />
    </div>
  );
};

export default Loader;
