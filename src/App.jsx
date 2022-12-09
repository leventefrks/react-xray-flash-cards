import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import { FiRotateCcw } from 'react-icons/fi';
import { GiCardRandom } from 'react-icons/gi';
import DATA from './assets/data.json';

const data = DATA;

const App = () => {
  const [isFlipped, setFlip] = useState(false);
  const [isToggle, setToggle] = useState(false);

  return (
    <div className="App">
      <div className="w-full min-h-screen bg-gray-100 px-2 sm:px-0">
        <h1 className="pt-4 text-4xl font-black text-gray-900 text-center">
          X-Ray Memory Test
        </h1>
        <div className="flex flex-col min-h-screen items-center justify-center">
          <div className="max-w-[500px] w-full text-center">
            <ReactCardFlip
              isFlipped={isFlipped}
              flipDirection="horizontal"
              cardZIndex="1"
            >
              <div className="p-4 h-[500px] w-500 shadow-xl bg-white rounded-md">
                <img
                  className="max-w-100 h-full object-contain rounded-sm"
                  src={data[0].image}
                  alt=""
                />
              </div>

              <div className="p-4 h-[500px] w-500 shadow-xl space-y-4 flex flex-col justify-center bg-white rounded-md text-left">
                <div>
                  <span className="font-bold text-md mr-3">Modalitás:</span>
                  {data[0].modality}
                </div>
                <div>
                  <span className="font-bold text-md mr-3">Régió:</span>
                  {data[0].region}
                </div>
                <div>
                  <span className="font-bold text-md mr-3">Radiológia:</span>
                  {data[0].radiology}
                </div>
                <div>
                  <span className="font-bold text-md mr-3">Diagnózis:</span>
                  {data[0].diagnose}
                </div>
              </div>
            </ReactCardFlip>
          </div>

          <button
            type="button"
            onClick={() => setFlip(!isFlipped)}
            className="flex gap-2 items-center mt-4 bg-black border-bg-black border-2 px-4 py-2 text-white text-sm rounded-md"
          >
            <FiRotateCcw className="w-3 h-3" />
            Show me the details
          </button>
          <button
            type="button"
            onClick={() => setToggle(!isToggle)}
            className="flex items-center gap-2 mt-4 bg-white border-black border-2 px-4 py-2 transition-colors duration-200 text-gray-900 text-sm rounded-md"
          >
            <GiCardRandom className="w-3 h-3" /> Gimme another X-Ray
          </button>
          {isToggle && (
            <div className="text-gray-900 py-2">
              This feature is not available yet! 😀
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
