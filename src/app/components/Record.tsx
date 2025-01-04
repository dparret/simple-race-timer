import React, { SetStateAction } from 'react';
import { isRaceFieldValid, place } from '../utils';

interface RecordProps {
    elapsedTime: string,
    places: place[],
    setPlaces: React.Dispatch<SetStateAction<place[]>>
}

const Record: React.FC<RecordProps> = ({elapsedTime, places, setPlaces}) => {
      // To record a new number and its time
  const recordNumber = (raceField: HTMLFormElement) => {
    const updatedPlaces = [...places, {position: places.length + 1, raceNumber: raceField.value, time: elapsedTime}]
    // Save the places in local storage
    localStorage.places = JSON.stringify(updatedPlaces);
    setPlaces(updatedPlaces);
  }

  const saveRaceNumber = () => {
    const raceField = document.getElementById('number') as HTMLFormElement;
    if (isRaceFieldValid(raceField, places)) recordNumber(raceField);
    raceField.value = ""
  }

  return (
    <div className="flex flex-row gap-2" >
      <input 
        type="number" 
        id="number" 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="The athlete's number" 
        />
      <button 
        type="button" 
        className="bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md" 
        onClick={() => saveRaceNumber()}
        > 
      Record
      </button>
    </div>
  );
}
export default Record;