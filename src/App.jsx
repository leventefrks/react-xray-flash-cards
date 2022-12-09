import { client } from './api';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
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

  return (
    <div className="App">
      <div className="w-full min-h-screen bg-gray-100 px-2 sm:px-0">
        <h1 className="pt-2 text-xl font-black text-gray-900 text-center">
          X-Ray Memory Test
        </h1>
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="max-w-[500px] w-full">
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection="horizontal"
              cardZIndex="1"
            >
              <div className="p-4 h-[500px] w-500 shadow-xl bg-white rounded-md">
                <span className="font-bold text-2xl text-left">
                  {currentIndex}
                </span>
                <img
                  className="max-w-100 h-full object-contain rounded-sm"
                  src={
                    currentItem?.image?.fields?.file?.url &&
                    currentItem?.image?.fields?.file?.url
                  }
                  alt=""
                />
              </div>

              <div className="p-4 h-[500px] w-500 shadow-xl space-y-4 flex flex-col justify-center bg-white rounded-md text-left">
                <div>
                  <span className="font-bold text-md mr-1">Modalitás:</span>
                  {currentItem?.modality && currentItem?.modality}
                </div>
                <div>
                  <span className="font-bold text-md mr-1">Régió:</span>
                  {currentItem?.region && currentItem?.region}
                </div>
                <div>
                  <span className="font-bold text-md mr-1">
                    Radiológiai jellemző:
                  </span>
                  {currentItem?.radiology && currentItem?.radiology}
                </div>
                <div>
                  <span className="font-bold text-md mr-1">Diagnózis:</span>
                  {currentItem?.diagnose && currentItem?.diagnose}
                </div>
              </div>
            </ReactCardFlip>
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <button
              type="button"
              onClick={() => setFlip(!isFlipped)}
              className="flex gap-2 items-center mt-4 bg-black border-bg-black border-2 px-4 py-2 text-white text-sm rounded-md"
            >
              <FiRotateCcw className="w-4 h-4" />
              Show me the details
            </button>
            <button
              type="button"
              onClick={() =>
                setCurrentIndex(prevIndex =>
                  items.length - 1 <= prevIndex ? 0 : prevIndex + 1
                )
              }
              className="flex items-center gap-2 mt-4 bg-white border-black border-2 px-4 py-2 transition-colors duration-200 text-gray-900 text-sm rounded-md"
            >
              <GiCardRandom className="w-4 h-4" />
              Gimme another X-Ray
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
