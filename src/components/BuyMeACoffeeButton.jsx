import ReactGA from 'react-ga4';
import { sendAnalytics } from '../analytics';
import { SiBuymeacoffee } from 'react-icons/si';

const BuyMeACoffeeButton = () => {
  return (
    <a
      className="flex  gap-2 items-center rounded-md bg-pink-500 p-2 text-white"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/leventefarkas"
      onClick={() => sendAnalytics('Donation', 'Click', 'Buy Me A Coffee')}
    >
      <SiBuymeacoffee className="h-4 w-4 sm:w-6 sm:h-6" />
      <span className="text-white text-xs">Buy Me A Coffee</span>
    </a>
  );
};

export default BuyMeACoffeeButton;
