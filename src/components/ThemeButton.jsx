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
      className={`group flex items-center rounded-md p-2 transition-all duration-150 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-600'
      }`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? (
        <CiDark className="h-4 w-4 group-hover:hover:scale-110 sm:h-6 sm:w-6" />
      ) : (
        <FiSun className="h-4 w-4 group-hover:hover:scale-110 sm:h-6 sm:w-6" />
      )}
    </button>
  );
};

export default ThemeButton;
