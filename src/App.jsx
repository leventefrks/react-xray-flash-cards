import { useState } from 'react';

const App = () => {
  const [isFlipped, setFlip] = useState(true);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center">X-Ray Memory Test</h1>
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        {isFlipped ? 'front cover' : 'back side'}
        <button
          type="button"
          onClick={() => setFlip(!isFlipped)}
          className="bg-black px-4 py-2 text-white text-sm"
        >
          Gimme another X-ray
        </button>
      </div>
    </div>
  );
};

export default App;
