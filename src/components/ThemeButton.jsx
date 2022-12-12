import { CiDark } from 'react-icons/ci';
import { FiSun } from 'react-icons/fi';

const ThemeButton = ({ toggleTheme, theme }) => {
  const ariaLabelPrefix = 'Switch to';

  return (
    <button
      type="button"
      aria-label={`${
        theme === 'dark'
          ? `${ariaLabelPrefix} light mode`
          : `${ariaLabelPrefix} dark mode`
      }`}
      className={`group flex items-center rounded-md transition-all duration-150 p-2 ${
        theme === 'dark' ? 'text-white' : 'text-gray-800'
      }`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <CiDark className="h-4 w-4 sm:w-6 sm:h-6 group-hover:hover:scale-110" />
      ) : (
        <FiSun className="h-4 w-4 sm:w-6 sm:h-6 group-hover:hover:scale-110" />
      )}
    </button>
  );
};

export default ThemeButton;
