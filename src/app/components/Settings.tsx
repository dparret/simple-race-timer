import React, { SetStateAction } from 'react';
import { place, settings } from '../utils';
import { DEFAULT_ELAPSED_TIME, DEFAULT_PLACES, DEFAULT_SETTING_MAX, DEFAULT_SETTING_MIN, DEFAULT_STARTTIME } from '../constants';
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
      setStartTime(DEFAULT_STARTTIME);
      setElapsedTime(DEFAULT_ELAPSED_TIME);
      setPlaces(DEFAULT_PLACES);
      setIsSettingsOpen(false);
    }
  }

  return (
    <div className="flex flex-col gap-8 items-center small:w-full large:w-1/2 large:max-w-96">
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm">
        Race Number Minimum
        </label>
        <div className="flex flex-row gap-2">
          <input 
            type="number"
            id="min-race-number"
            className="grow w-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
            placeholder="The minimum race number"
            value={settings.min} 
            onChange={(value) => setSettings({min: Number(value.currentTarget.value), max: settings.max})}
          />
          <button 
            className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
            onClick={() => setSettings({min: DEFAULT_SETTING_MIN, max: settings.max})}
          >
            <ArrowUturnLeftIcon className="size-4 text-white" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm">
        Race Number Maximum
        </label>
        <div className="flex flex-row gap-2">
          <input 
            type="number"
            id="max-race-number"
            className="grow w-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
            placeholder="The maximum race number"
            value={settings.max}
            onChange={(value) => setSettings({min: settings.min, max: Number(value.currentTarget.value)})}
          />
          <button 
            className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
            onClick={() => setSettings({min: settings.min, max: DEFAULT_SETTING_MAX})}
          >
            <ArrowUturnLeftIcon className="size-4 text-white" />
          </button>
        </div>
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