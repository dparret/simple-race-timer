import React, { SetStateAction } from 'react';
import { isFieldEmpty, isRaceFieldValid, place, settings } from '../utils';

interface RecordProps {
    elapsedSeconds: number,
    places: place[],
    setPlaces: React.Dispatch<SetStateAction<place[]>>,
    settings: settings
}

const Record: React.FC<RecordProps> = ({elapsedSeconds, places, setPlaces, settings}) => {
  // To record a new number and its time
  const recordNumber = (raceField: HTMLFormElement, withSameTime: boolean) => {
    const updatedPlaces = withSameTime
      ? [...places, {position: places.length + 1, raceNumber: raceField.value, timeInSeconds: places[places.length - 1].timeInSeconds}]
      : [...places, {position: places.length + 1, raceNumber: raceField.value, timeInSeconds: elapsedSeconds}]
    
    // Save the places in local storage
    localStorage.places = JSON.stringify(updatedPlaces);
    setPlaces(updatedPlaces);
  }

  const saveRaceNumber = (withSameTime: boolean) => {
    const raceField = document.getElementById('number') as HTMLFormElement;
    if (isRaceFieldValid(raceField.value, places, settings)) recordNumber(raceField, withSameTime);
    raceField.value = ""
  }

  return (
    <div className="flex flex-col gap-2 w-full large:max-w-lg" >
      <input 
        type="number"
        id="number"
        pattern="[0-9]*"
        className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
        placeholder={`Race number (${settings.min}-${settings.max})`}
      />
      <div className="flex flex-row gap-2 w-full" >
        <button 
          type="button" 
          className="w-1/2 text-white py-2 px-4 rounded-md bg-green-800 disabled:bg-gray-500 hover:bg-green-700" 
          onClick={() => saveRaceNumber(true)}
          disabled={places.length === 0 || isFieldEmpty('number')}
        >
        Same Time
        </button>
        <button 
          type="button" 
          className="w-1/2 text-white py-2 px-4 rounded-md bg-green-600 disabled:bg-gray-500 hover:bg-green-700" 
          onClick={() => saveRaceNumber(false)}
          disabled={isFieldEmpty('number')}
        >
        Record
        </button>
      </div>
    </div>
  );
}

export default Record;
