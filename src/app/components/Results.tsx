import React, { SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import Override from './Override';
import { place, settings } from '../utils';

interface ResultsProps {
  places: place[],
  setPlaces: React.Dispatch<SetStateAction<place[]>>,
  settings: settings,
}

const Results: React.FC<ResultsProps> = ({ places, setPlaces, settings }) => {
  const [isOverrideOpen, setIsOverrideOpen] = useState(false);

  const csvData = [
    ["Postion", "Race Number", "Time"],
    ...places.map(({position, raceNumber, time}) => [position, raceNumber, time])
  ]

  return (
  <div className="flex flex-col gap-4 items-center w-full">
    <div className="flex flex-col gap-0">
      {places.map(({position, raceNumber, time}) =>
      <div className="grid grid-cols-3 gap-2" key={`parent-${raceNumber}`}>
        <div className='text-l text-neutral-500 font-mono'>
          {position}.
        </div>
        <div className='text-l font-mono'>
          {raceNumber}
        </div>
        <div className='text-l font-mono'>
          {time}
        </div>
      </div>
      )}
    </div>

    {!isOverrideOpen ?
    <div className="flex flex-row gap-2 justify-center">
      {places.length > 0 &&
        <>
          <CSVLink
            className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            filename={`race-results-${format(Date.now(), 'dd-MMMM-yyyy').toLowerCase()}.csv`}
            data={csvData}
          > 
            Download Results
          </CSVLink>
          <button 
          className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
          onClick={() => setIsOverrideOpen(true)}
          >
            <PencilSquareIcon className="size-4 text-white" />
          </button>
        </>
      }
    </div>
    :
    <Override places={places} setPlaces={setPlaces} settings={settings} setIsOverrideOpen={setIsOverrideOpen}/>
    }
  </div>
  );
};

export default Results;
