import React, { SetStateAction } from 'react';
import { isRaceFieldValid, place, settings } from '../utils';

interface RecordProps {
    elapsedTime: string,
    places: place[],
    setPlaces: React.Dispatch<SetStateAction<place[]>>,
    settings: settings
}

const Record: React.FC<RecordProps> = ({elapsedTime, places, setPlaces, settings}) => {
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
    <div className="flex flex-row gap-2 w-full" >
      <input 
        type="number"
        id="number"
        className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
        placeholder={`Race number (${settings.min}-${settings.max})`}
      />
      <button 
        type="button" 
        className="text-white py-2 px-4 rounded-md bg-green-600 disabled:bg-gray-400 hover:bg-green-700" 
        onClick={() => saveRaceNumber()}
      >
      Record
      </button>
    </div>
  );
}
export default Record;