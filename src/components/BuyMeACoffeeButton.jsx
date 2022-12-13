import { sendAnalytics } from '../analytics';
import { SiBuymeacoffee } from 'react-icons/si';

const BuyMeACoffeeButton = () => {
  return (
    <a
      className="group flex items-center gap-2 rounded-md bg-yellow-700 p-2 text-white transition-all duration-150 hover:bg-yellow-800"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/leventefarkas"
      onClick={() => sendAnalytics('Donation', 'Click', 'Buy Me A Coffee')}
    >
      <SiBuymeacoffee className="h-4 w-4 group-hover:rotate-12 sm:h-6 sm:w-6" />
      <span className="sm:text-md text-xs font-bold text-white">
        Buy Me A Coffee
      </span>
    </a>
  );
};

export default BuyMeACoffeeButton;
