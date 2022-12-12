import { SiBuymeacoffee } from 'react-icons/si';

const BuyMeACoffeeButton = () => {
  return (
    <a
      className="flex items-center rounded-md bg-pink-500 p-2 text-white"
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.buymeacoffee.com/leventefarkas"
    >
      <SiBuymeacoffee className="h-5 w-5 sm:w-6 sm:h-6" />
    </a>
  );
};

export default BuyMeACoffeeButton;
