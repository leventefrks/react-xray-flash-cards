import { sendAnalytics } from '../analytics';
import { SiBuymeacoffee } from 'react-icons/si';

const BuyMeACoffeeButton = () => {
  return (
    <a
      className="group flex gap-2 items-center rounded-md bg-amber-600 hover:bg-amber-500 transition-all duration-150 p-2 text-white"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/leventefarkas"
      onClick={() => sendAnalytics('Donation', 'Click', 'Buy Me A Coffee')}
    >
      <SiBuymeacoffee className="h-4 w-4 sm:w-6 sm:h-6 group-hover:rotate-12" />
      <span className="text-white text-xs sm:text-md font-bold">
        Buy Me A Coffee
      </span>
    </a>
  );
};

export default BuyMeACoffeeButton;
