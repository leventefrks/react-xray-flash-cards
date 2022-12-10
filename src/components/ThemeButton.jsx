import { CiDark } from 'react-icons/ci';
import { FiSun } from 'react-icons/fi';

const ThemeButton = ({ toggleTheme, theme }) => {
  return (
    <button
      type="button"
      aria-label="Toggle Light & Dark Mode"
      className="absolute top-2 right-2 flex items-center rounded-md bg-green-500 p-2 text-white"
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <CiDark className="h-5 w-5 sm:w-6 sm:h-6" />
      ) : (
        <FiSun className="h-5 w-5 sm:w-6 sm:h-6" />
      )}
    </button>
  );
};

export default ThemeButton;
