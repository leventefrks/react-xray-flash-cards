import { client } from './api';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
import { RxCaretLeft } from 'react-icons/rx';
import { RxCaretRight } from 'react-icons/rx';
import CardFront from './components/CardFront';
import CardBack from './components/CardBack';
import { useEffect } from 'react';

const App = () => {
  const [isFlipped, setFlip] = useState(false);
  const [isToggle, setToggle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { items } = await client.getEntries({
          content_type: 'xray',
        });

        setItems(items);
        setCurrentItem(items[currentIndex].fields);
      } catch (error) {
        console.error('Failed to fetch x-ray items', error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setCurrentItem(items[currentIndex]?.fields);
  }, [currentIndex]);

  const onGenerateRandomNumber = () =>
    setCurrentIndex(Math.ceil(Math.random() * (items.length - 1 - 1)) + 1);

  return (
    <div className="App">
      <div className="w-full min-h-screen bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 px-2 sm:px-0">
        <h1 className="pt-4 text-3xl font-light text-white text-center">
          X-Ray Memory Test
        </h1>
        <h2 className="pt-1 text-xl font-bold text-gray-300 text-center">
          How much do you know about radiology? Let's find out!
        </h2>
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
                className={`w-10 h-10 ${
                  currentIndex === 0
                    ? 'text-gray-100 cursor-not-allowed'
                    : 'text-white'
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
                className="w-10 h-10 text-white"
                aria-label="next item"
              />
            </button>
          </div>

          <div className="mt-2 flex flex-col gap-6 md:mt-6 mb-6 md:mb-0 md:flex-row">
            <button
              type="button"
              onClick={() => setFlip(!isFlipped)}
              className="self-center flex gap-2 items-center bg-yellow-400 hover:bg-yellow-500 text-indigo-600 px-4 py-2 font-bold text-sm rounded-md"
            >
              <FiRotateCcw className="w-4 h-4" />
              Know more
            </button>
            <button
              type="button"
              onClick={() => onGenerateRandomNumber()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 transition-colors duration-200 text-white font-bold text-sm rounded-md"
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
