import { useState, useEffect } from 'react';
import { client } from './api';
import ReactCardFlip from 'react-card-flip';
import { FiRotateCcw } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';
import Layout from './layout/Layout';
import Title from './components/Title';
import SubTitle from './components/SubTitle';
import Loader from './components/Loader';
import ThemeButton from './components/ThemeButton';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';

const App = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
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
          const { image, modality, radiology, region, diagnose } = item.fields;

          return {
            image,
            modality,
            radiology,
            region,
            diagnose,
          };
        });

        setItems(sanitizedItems);
        setCurrentItem(sanitizedItems[currentIndex]);
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setCurrentItem(items[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('body').classList.add('dark');
    } else {
      document.querySelector('body').classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const onGenerateRandomNumber = () =>
    setCurrentIndex(Math.ceil(Math.random() * (items.length - 1 - 1)) + 1);

  return (
    <div className="App">
      <Layout>
        <Title />

        <SubTitle />

        <ThemeButton toggleTheme={toggleTheme} theme={theme} />

        <div className="relative flex flex-col mt-6 space-y-6 items-center justify-center">
          <div className="flex gap-2 items-center">
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
                className={`w-6 h-6 sm:w-10 sm:h-10 dark:text-white text-gray-700 ${
                  currentIndex === 0 && 'cursor-not-allowed'
                } `}
                aria-label="Previous item"
              />
            </button>

            {isLoading ? (
              <Loader />
            ) : (
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
            )}
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
                className="w-6 h-6 sm:w-10 sm:h-10 dark:text-white text-gray-800"
                aria-label="Next item"
              />
            </button>
          </div>

          <div className="flex flex-col gap-6 mb-6 md:mb-0 md:flex-row">
            <button
              type="button"
              onClick={() => setFlip(!isFlipped)}
              className="group select-none self-center flex gap-2 items-center bg-yellow-400 hover:bg-yellow-500 text-indigo-800 px-4 py-2 font-bold text-sm rounded-md"
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
              className="select-none flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 transition-colors duration-200 text-white font-bold text-sm rounded-md"
            >
              <GiCardRandom className="w-4 h-4" aria-hidden="true" />
              Random image
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default App;
