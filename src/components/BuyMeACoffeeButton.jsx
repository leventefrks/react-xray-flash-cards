import { sendAnalytics } from '../analytics';
import { SiBuymeacoffee } from 'react-icons/si';

const BuyMeACoffeeButton = () => {
  return (
    <a
      className="duration-15 group flex items-center gap-2 rounded-md border-2 border-gray-600 py-1 px-2 text-gray-600 transition-all dark:border-gray-100 dark:text-gray-100"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/leventefarkas"
      onClick={() => sendAnalytics('Donation', 'Click', 'Buy Me A Coffee')}
    >
      <SiBuymeacoffee
        className="h-4 w-4 group-hover:rotate-12 sm:h-6 sm:w-6"
        aria-hidden="true"
      />
      <span className="sm:text-md text-xs font-bold text-gray-600 dark:text-gray-100">
        Buy Me A Coffee
      </span>
    </a>
  );
};

export default BuyMeACoffeeButton;
