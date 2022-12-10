import { useState, useEffect } from 'react';
import { client } from './api';
import { FiRotateCcw, FiSun } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
import { CiDark } from 'react-icons/ci';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import ReactCardFlip from 'react-card-flip';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';

const App = () => {
  const [isFlipped, setFlip] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { items } = await client.getEntries({
          content_type: 'xray',
        });

        setItems(items);
        setCurrentItem(items[currentIndex].fields);
      } catch (error) {
        console.error('Failed to fetch items', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setCurrentItem(items[currentIndex]?.fields);
  }, [currentIndex]);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const onGenerateRandomNumber = () =>
    setCurrentIndex(Math.ceil(Math.random() * (items.length - 1 - 1)) + 1);

  return (
    <div className="App">
      <div className="relative w-full min-h-screen bg-black dark:bg-gray-100 px-2 sm:px-0">
        <h1 className="pt-4 text-3xl font-light text-white dark:text-gray-800 text-center">
          X-Ray Memory Test
        </h1>

        <h2 className="pt-1 text-xl font-bold text-white dark:text-gray-800 text-center">
          How much do you know about radiology? Let's find out!
        </h2>

        <button
          type="button"
          aria-label="Toggle Light & Dark Mode"
          className="absolute top-2 right-2 flex items-center rounded-md bg-indigo-800 p-2 text-gray-100"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <FiSun className="h-6 w-6" />
          ) : (
            <CiDark className="h-6 w-6" />
          )}
        </button>

        <div className="relative flex flex-col mt-6 items-center justify-center">
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="w-10 h-10"
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex(prevIndex =>
                  prevIndex <= 0 ? 0 : prevIndex - 1
                )
              }
            >
              <RxCaretLeft
                className={`w-10 h-10 text-white dark:text-gray-400 ${
                  currentIndex === 0 && 'cursor-not-allowed'
                } `}
                aria-label="previous item"
              />
            </button>

            <div className="max-w-[500px] w-full">
              <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection="horizontal"
                cardZIndex="1"
              >
                <CardFront
                  image={currentItem?.image?.fields?.file?.url}
                  currentIndex={currentIndex}
                />

                <CardBack
                  modality={currentItem?.modality}
                  region={currentItem?.region}
                  radiology={currentItem?.radiology}
                  diagnose={currentItem?.diagnose}
                />
              </ReactCardFlip>
            </div>
            <button
              type="button"
              className="w-10 h-10"
              onClick={() =>
                setCurrentIndex(prevIndex =>
                  items.length - 1 <= prevIndex ? 0 : prevIndex + 1
                )
              }
            >
              <RxCaretRight
                className="w-10 h-10 text-white dark:text-gray-400"
                aria-label="next item"
              />
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-6 md:mt-6 mb-6 md:mb-0 md:flex-row">
            <button
              type="button"
              onClick={() => setFlip(!isFlipped)}
              className="select-none self-center flex gap-2 items-center bg-yellow-400 hover:bg-yellow-500 text-indigo-800 px-4 py-2 font-bold text-sm rounded-md"
            >
              <FiRotateCcw className="w-4 h-4" />
              Know more
            </button>
            <button
              type="button"
              onClick={() => onGenerateRandomNumber()}
              className="select-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 transition-colors duration-200 text-white font-bold text-sm rounded-md"
            >
              <GiCardRandom className="w-4 h-4" />
              Random image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
