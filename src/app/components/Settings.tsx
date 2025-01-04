import React, { SetStateAction } from 'react';
import { place } from '../utils';
import { DEFAULT_ELAPSED_TIME, PLACES_DEFAULT, STARTTIME_DEFAULT } from '../constants';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface SettingsProps {
  setStartTime: React.Dispatch<SetStateAction<number>>,
  setElapsedTime: React.Dispatch<SetStateAction<string>>,
  setPlaces: React.Dispatch<SetStateAction<place[]>>
  setIsSettingsOpen: React.Dispatch<SetStateAction<boolean>>
}

const Settings: React.FC<SettingsProps> = ({setStartTime, setElapsedTime, setPlaces, setIsSettingsOpen}) => {
  // To reset the stopwatch.
  const reset = () => {
    if (confirm("Clear all results and reset timer?")) {
      setStartTime(STARTTIME_DEFAULT);
      setElapsedTime(DEFAULT_ELAPSED_TIME);
      setPlaces(PLACES_DEFAULT);
      setIsSettingsOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-row gap-2 items-center">
        <div className='text-s w-40 text-center'>
        Settings
        </div>
        <button 
          className="w-10 h-10 rounded-md flex items-center justify-center transition-all hover:bg-neutral-800"
          onClick={() => setIsSettingsOpen(false)}
        >
          <XMarkIcon className="size-4 text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <button 
          className="bg-red-500 disabled:bg-gray-400 hover:bg-red-600 text-white py-2 px-4 rounded-md" 
          onClick={reset}
        >
        Reset Timer...
        </button>
      </div>
    </div>
  );
}

export default Settings;