import React, { SetStateAction } from 'react';
import { place, settings } from '../utils';
import { DEFAULT_ELAPSED_TIME, PLACES_DEFAULT, STARTTIME_DEFAULT } from '../constants';
import { ArrowUturnLeftIcon } from '@heroicons/react/16/solid';

interface SettingsProps {
  setStartTime: React.Dispatch<SetStateAction<number>>,
  setElapsedTime: React.Dispatch<SetStateAction<string>>,
  setPlaces: React.Dispatch<SetStateAction<place[]>>,
  setIsSettingsOpen: React.Dispatch<SetStateAction<boolean>>,
  settings: settings,
  setSettings: React.Dispatch<SetStateAction<settings>>
}

const Settings: React.FC<SettingsProps> = ({setStartTime, setElapsedTime, setPlaces, setIsSettingsOpen, settings, setSettings}) => {
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
        <button 
          className="w-10 h-10 rounded-md flex items-center justify-center transition-all hover:bg-neutral-800"
          onClick={() => setIsSettingsOpen(false)}
        >
          <ArrowUturnLeftIcon className="size-4 text-white" />
        </button>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm">
        Race Number Minimum
        </label>
        <input 
          type="number"
          id="min-race-number"
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 placeholder-gray-400"
          placeholder="The minimum race number"
          defaultValue={settings.min} 
          onChange={(value) => setSettings({min: Number(value.currentTarget.value), max: settings.max})}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm">
        Race Number Maximum
        </label>
        <input 
          type="number"
          id="max-race-number"
          className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full h-10 p-2.5 placeholder-gray-400"
          placeholder="The maximum race number"
          defaultValue={settings.max}
          onChange={(value) => setSettings({min: settings.min, max: Number(value.currentTarget.value)})}
        />
      </div>
      <button 
          className="w-full bg-red-500 disabled:bg-gray-400 hover:bg-red-600 text-white py-2 px-4 rounded-md"
          onClick={reset}
        >
      Reset Timer...
      </button>
    </div>
  );
}

export default Settings;