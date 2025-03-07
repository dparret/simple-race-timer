import React, { SetStateAction } from 'react';
import { isFieldEmpty, isRaceFieldPresent, isRaceFieldValid, place, settings } from '../utils';

interface NotesProps {
  places: place[],
  setPlaces: React.Dispatch<SetStateAction<place[]>>,
  settings: settings,
  setIsOverrideOpen: React.Dispatch<SetStateAction<boolean>>,
}

const Override: React.FC<NotesProps> = ({places, setPlaces, settings, setIsOverrideOpen}) => {
  const numberToOverride = document.getElementById('number-to-override') as HTMLFormElement;
  const newRaceNumber = document.getElementById('number-updated') as HTMLFormElement;

  // To update a race number without changing its time nor position
  const updateNumber = (numberToReplace: number, newNumber: number, places: place[]) => {
    const updatedPlaces: place[] = places.map((place) => 
      place.raceNumber === numberToReplace ? {...place, raceNumber: newNumber} : place)
    
    // Save the places in local storage
    localStorage.places = JSON.stringify(updatedPlaces);
    setPlaces(updatedPlaces);
  }

  const updateRaceNumber = () => {
    if (isRaceFieldPresent(numberToOverride.value, places) && isRaceFieldValid(newRaceNumber.value, places, settings)) {
      updateNumber(numberToOverride.value, newRaceNumber.value, places);
      return true
    }

    // Reset values
    numberToOverride.value = "";
    newRaceNumber.value = "";
    return false;
  }

  return (
  <div className="flex flex-row gap-4">
    <input 
      type="number"
      id="number-to-override"
      pattern="[0-9]*"
      className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
      placeholder={`Number to override`}
    />
    <input 
      type="number"
      id="number-updated"
      pattern="[0-9]*"
      className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
      placeholder={`New race number`}
    />
    <button 
        type="button" 
        className="w-1/2 text-white py-2 px-4 rounded-md bg-green-800 disabled:bg-gray-500 hover:bg-green-700" 
        onClick={() => {
          updateRaceNumber();
          setIsOverrideOpen(false);
        }}
        disabled={isFieldEmpty('number-to-override') || isFieldEmpty('number-updated')}
      >
      Override
    </button>
  </div>
  );
}

export default Override;
