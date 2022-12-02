import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';

const App = () => {
  const [isFlipped, setFlip] = useState(false);
  const [isToggle, setToggle] = useState(false);

  return (
    <div className="App">
      <div className="w-full min-h-screen bg-gray-100 sm:px-4">
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
              <div className="p-4 h-[400px] w-400 flex items-center justify-center shadow-xl bg-white rounded-md">
                <img
                  className="max-w-100 h-full object-cover rounded-sm"
                  src="/hand.webp"
                  alt=""
                />
              </div>

              <div className="p-4 h-[400px] w-400 shadow-xl bg-white rounded-md">
                This is a...Yep, this is definitely a hand! 😀
              </div>
            </ReactCardFlip>
          </div>

          <button
            type="button"
            onClick={() => setFlip(!isFlipped)}
            className="mt-8 bg-gray-900 hover:bg-black transition-colors duration-200 px-4 py-2 text-white text-sm rounded-sm"
          >
            Show me the details
          </button>
          <button
            type="button"
            onClick={() => setToggle(!isToggle)}
            className="mt-2 bg-white border-black hover:bg-black hover:text-white border-2 px-4 py-2 transition-colors duration-200 text-gray-900 text-sm rounded-sm"
          >
            Gimme another X-ray
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
