import ReactGA from 'react-ga4';
import client from './api';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
import { FiRotateCcw } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
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
    const fetchItems = async () => {
      setLoading(true);
      try {
        const { items } = await client.getEntries({
          content_type: 'xray',
          select: 'fields',
        });

        const sanitizedItems = items.map(item => {
          return {
            ...item.fields,
          };
        });

        setItems(sanitizedItems);
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
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
    setCurrentIndex(random.int(0, items.length - 1));
    sendAnalytics('Random Number', 'Click');
  };

  return (
    <div className="App">
      <div className="min-h-screen min-w-screen dark:bg-black bg-gray-50">
        <Layout>
          <div className="relative top-4 right-2 flex justify-end gap-2 sm:gap-4">
            <BuyMeACoffeeButton />
            <ThemeButton toggleTheme={toggleTheme} theme={theme} />
          </div>

          <Title />
          <SubTitle />

          <div className="relative flex flex-col mt-6 space-y-6 items-center justify-center">
            {isLoading ? (
              <Loader />
            ) : (
              <motion.div
                layout
                initial={{ opacity: 0, y: '-10px' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-[450px] w-full"
                onClick={() => setFlip(!isFlipped)}
              >
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
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
              </motion.div>
            )}

            <div className="flex items-center justify-between gap-6 mb-6 sm:mb-0">
              <button
                type="button"
                className="w-6 h-6 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-150"
                disabled={currentIndex === 0}
                onClick={() =>
                  setCurrentIndex(prevIndex =>
                    prevIndex <= 0 ? 0 : prevIndex - 1
                  )
                }
              >
                <RxCaretLeft
                  className={`w-6 h-6 sm:w-10 sm:h-10 dark:text-gray-100 text-gray-800 ${
                    currentIndex === 0 && 'cursor-not-allowed'
                  } `}
                  aria-label="Previous item"
                />
              </button>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-6 ">
                <button
                  type="button"
                  onClick={() => setFlip(!isFlipped)}
                  className="group select-none flex gap-2 items-center bg-yellow-400 hover:bg-yellow-300 text-indigo-700 px-4 py-2 font-bold text-xs sm:text-md rounded-md"
                >
                  <FiRotateCcw
                    className="w-4 h-4 group-hover:rotate-180 transition-transform duration-250"
                    aria-hidden="true"
                  />
                  Know more
                </button>
                <button
                  type="button"
                  onClick={() => onGenerateRandomNumber()}
                  className="group select-none flex items-center gap-2 bg-indigo-700 hover:bg-indigo-600 px-4 py-2 transition-all duration-150 text-white font-bold text-xs sm:text-md rounded-md"
                >
                  <GiCardRandom
                    className="w-4 h-4 group-hover:-rotate-12"
                    aria-hidden="true"
                  />
                  Random image
                </button>
              </div>
              <button
                type="button"
                className="w-6 h-6 sm:w-10 sm:h-10 hover:scale-110 transition-transform duration-150"
                onClick={() =>
                  setCurrentIndex(prevIndex =>
                    items.length - 1 <= prevIndex ? 0 : prevIndex + 1
                  )
                }
              >
                <RxCaretRight
                  className="w-6 h-6 sm:w-10 sm:h-10 dark:text-gray-100 text-gray-800"
                  aria-label="Next item"
                />
              </button>
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default App;
