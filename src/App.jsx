import ReactGA from 'react-ga4';
import { fetchImages } from './api';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import random from 'random';
import { sendAnalytics } from './analytics';

import Layout from './layout/Layout';
import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Loader from './components/Loader';
import ThemeButton from './components/ThemeButton';
import BuyMeACoffeeButton from './components/BuyMeACoffeeButton';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';

import ReactCardFlip from 'react-card-flip';
import { GiCardRandom } from 'react-icons/gi';
import { MdRotateLeft } from 'react-icons/md';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

ReactGA.initialize(GA_MEASUREMENT_ID);
ReactGA.send('pageview');

const App = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setFlip] = useState(false);
  const [theme, setTheme] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const onMounted = async () => {
      setLoading(true);
      const items = await fetchImages();
      const sanitizedItems = items.map(item => {
        return {
          ...item.fields,
        };
      });

      setItems(sanitizedItems);
      setLoading(false);
    };

    onMounted();
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    if (query.matches) setTheme('dark');
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    sendAnalytics('Card Flipped', 'Click');
  }, [isFlipped]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    sendAnalytics('Toggle Theme', 'Click');
  };

  const onGenerateRandomNumber = () => {
    const randomNumber = random.int(0, items.length - 1);
    setCurrentIndex(randomNumber);
    sendAnalytics('Random Number', 'Click');
  };

  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="min-w-screen min-h-screen bg-indigo-50 dark:bg-black"
      >
        <Layout>
          <div className="relative top-4 right-2 flex justify-end gap-6 sm:gap-8">
            <BuyMeACoffeeButton />
            <ThemeButton toggleTheme={toggleTheme} theme={theme} />
          </div>

          <Title />
          <SubTitle />

          <div className="relative mt-6 flex flex-col items-center justify-center space-y-8">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="flex w-full max-w-[500px] flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="text-md flex items-center gap-2 font-bold text-gray-400 dark:text-gray-100">
                    <span>
                      {items.length > 0 ? items.length : items.length}
                    </span>
                    <span className="text-light text-sm">images</span>
                  </div>
                  <div className="relative flex items-center gap-2 font-bold text-gray-300 dark:text-gray-50 md:-right-8">
                    <MdRotateLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setFlip(!isFlipped)}
                >
                  <ReactCardFlip
                    isFlipped={isFlipped}
                    flipDirection="horizontal"
                    cardZIndex="1"
                  >
                    <CardFront
                      image={items[currentIndex]?.image?.fields?.file?.url}
                    />
                    <CardBack
                      modality={items[currentIndex]?.modality}
                      region={items[currentIndex]?.region}
                      radiology={items[currentIndex]?.radiology}
                      diagnose={items[currentIndex]?.diagnose}
                    />
                  </ReactCardFlip>
                </div>
              </div>
            )}
            <div className="flex items-center justify-between gap-6">
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-white text-gray-600 transition-transform duration-150 hover:scale-110 dark:bg-black dark:text-gray-100 sm:h-11 sm:w-11"
                disabled={currentIndex === 0}
                onClick={() =>
                  setCurrentIndex(prevIndex =>
                    prevIndex <= 0 ? 0 : prevIndex - 1
                  )
                }
              >
                <RxCaretLeft
                  className={`h-full w-full ${
                    currentIndex === 0 && 'cursor-not-allowed'
                  } `}
                  aria-label="Previous item"
                />
              </button>
              <button
                type="button"
                onClick={() => onGenerateRandomNumber()}
                disabled={isLoading}
                className="sm:text-md group flex select-none items-center justify-center gap-2 rounded-md bg-indigo-700 px-4 py-2 text-xs font-bold text-white transition-all duration-150 hover:bg-indigo-600"
              >
                <GiCardRandom
                  className="h-4 w-4 group-hover:-rotate-12"
                  aria-hidden="true"
                />
                Random image
              </button>
              <button
                type="button"
                className="h-9 w-9 rounded-full bg-white text-gray-600 transition-transform duration-150 hover:scale-110 dark:bg-black dark:text-gray-100 sm:h-11 sm:w-11"
                onClick={() =>
                  setCurrentIndex(prevIndex =>
                    items.length - 1 <= prevIndex ? 0 : prevIndex + 1
                  )
                }
              >
                <RxCaretRight
                  className="h-full w-full"
                  aria-label="Next item"
                />
              </button>
            </div>
          </div>
        </Layout>
      </motion.div>
    </div>
  );
};

export default App;
