import React, { SetStateAction } from 'react';
import { isFieldEmpty, isRaceFieldPresent, isTimeValid, place, timerFormatToSeconds } from '../utils';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface OverrideTimeProps {
  places: place[],
  setPlaces: React.Dispatch<SetStateAction<place[]>>,
  setIsOverrideOpen: React.Dispatch<SetStateAction<boolean>>,
}

const OverrideTime: React.FC<OverrideTimeProps> = ({places, setPlaces, setIsOverrideOpen}) => {
  const setNewTime = () => {
    // Get the values
    const numberToUpdate = document.getElementById('number-to-update') as HTMLFormElement;
    const newTime = document.getElementById('time-new') as HTMLFormElement;

    if (isRaceFieldPresent(numberToUpdate.value, places) && isTimeValid(newTime.value)) {
      const updatedPlaces: place[] = places.map((place) => 
        place.raceNumber === numberToUpdate.value ? {...place, timeInSeconds: timerFormatToSeconds(newTime.value)} : place)
      
      // Reorder results based on new time
      updatedPlaces.sort((a, b) => a.timeInSeconds - b.timeInSeconds)
      
      // Save the places in local storage
      localStorage.places = JSON.stringify(updatedPlaces);
      setPlaces(updatedPlaces);

      return true;
    }

    // Reset values
    numberToUpdate.value = "";
    newTime.value = "";
    return false;
  }

  return (
  <div className="flex flex-col gap-2 w-full large:max-w-lg">
    <input 
      type="number"
      id="number-to-update"
      pattern="[0-9]*"
      className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
      placeholder={`Number to update`}
    />
    <input 
      type="string"
      id="time-new"
      className="grow text-white text-sm bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 h-10 p-2.5 placeholder-gray-400"
      placeholder={`New time (HH:MM:SS)`}
    />
    <div className='flex flex-row gap-2 justify-end'>
      <button 
        className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
        onClick={() => setIsOverrideOpen(false)}
      >
        <XMarkIcon className="size-4 text-white" />
      </button>
      <button
          type="button" 
          className="w-1/2 text-white py-2 px-4 rounded-md bg-green-800 disabled:bg-gray-500 hover:bg-green-700" 
          onClick={() => {
            setNewTime();
            setIsOverrideOpen(false);
          }}
          disabled={isFieldEmpty('number-to-update') || isFieldEmpty('time-new')}
        >
        Override
      </button>
    </div>
  </div>
  );
}

export default OverrideTime;
