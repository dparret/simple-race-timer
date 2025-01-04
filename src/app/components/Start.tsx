import React, { SetStateAction } from 'react';
import { DEFAULT_ELAPSED_TIME, PLACES_DEFAULT, STARTTIME_DEFAULT } from '../constants';
import { place } from '../utils';

interface StartProps {
    setStartTime: React.Dispatch<SetStateAction<number>>,
    setElapsedTime: React.Dispatch<SetStateAction<string>>,
    setPlaces: React.Dispatch<SetStateAction<place[]>>
}

const Start: React.FC<StartProps> = ({setStartTime, setElapsedTime, setPlaces}) => {
  // To reset the stopwatch.
  const reset = () => {
    if (confirm("Clear all results and reset timer?")) {
      setStartTime(STARTTIME_DEFAULT);
      setElapsedTime(DEFAULT_ELAPSED_TIME);
      setPlaces(PLACES_DEFAULT);
    }
  }

  return (
    <div className="flex flex-row gap-2">
      <button 
        className="bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md" 
        onClick={() => setStartTime(Date.now())}
      >
      Start
      </button>
      <button 
        className="bg-red-500 disabled:bg-gray-400 hover:bg-red-600 text-white py-2 px-4 rounded-md" 
        onClick={() => reset()}
      >
      Reset
      </button>
      {/*
      <Link className="w-10 rounded-md flex items-center justify-center transition-all hover:bg-neutral-800" href="/settings">
        <Cog6ToothIcon className="size-4 text-white" />
      </Link>
      */}
    </div>
  );
}
export default Start;