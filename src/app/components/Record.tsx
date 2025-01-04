import React, { SetStateAction } from 'react';
import { isRaceFieldValid, place, settings } from '../utils';
import { Cog6ToothIcon } from '@heroicons/react/16/solid';

interface RecordProps {
    elapsedTime: string,
    places: place[],
    setPlaces: React.Dispatch<SetStateAction<place[]>>,
    setIsSettingsOpen: React.Dispatch<SetStateAction<boolean>>,
    settings: settings
}

const Record: React.FC<RecordProps> = ({elapsedTime, places, setPlaces, setIsSettingsOpen, settings}) => {
      // To record a new number and its time
  const recordNumber = (raceField: HTMLFormElement) => {
    const updatedPlaces = [...places, {position: places.length + 1, raceNumber: raceField.value, time: elapsedTime}]
    // Save the places in local storage
    localStorage.places = JSON.stringify(updatedPlaces);
    setPlaces(updatedPlaces);
  }

  const saveRaceNumber = () => {
    const raceField = document.getElementById('number') as HTMLFormElement;
    if (isRaceFieldValid(raceField, places, settings)) recordNumber(raceField);
    raceField.value = ""
  }

  return (
    <div className="flex flex-row gap-2" >
      <input 
        type="number"
        id="number"
        className="bg-gray-700 border border-gray-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-max h-10 p-2.5 placeholder-gray-400"
        placeholder={`Race number (${settings.min}-${settings.max})`}
      />
      <button 
        type="button" 
        className="bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md" 
        onClick={() => saveRaceNumber()}
      >
      Record
      </button>
      <button 
        className="w-10 h-10 rounded-md flex items-center justify-center transition-all hover:bg-neutral-800"
        onClick={() => setIsSettingsOpen(true)}
      >
        <Cog6ToothIcon className="size-4 text-white" />
      </button>
    </div>
  );
}
export default Record;