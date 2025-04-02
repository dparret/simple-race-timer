import React, { SetStateAction, useState } from 'react';
import { format } from 'date-fns';
import { CSVLink } from 'react-csv';
import { ClockIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import OverrideNumber from './OverrideNumber';
import { formatTimerFromSeconds, place, settings } from '../utils';
import OverrideTime from './OverrideTime';

interface ResultsProps {
  places: place[],
  setPlaces: React.Dispatch<SetStateAction<place[]>>,
  settings: settings,
}

const Results: React.FC<ResultsProps> = ({ places, setPlaces, settings }) => {
  const [isOverrideRaceNumberOpen, setIsOverrideRaceNumberOpen] = useState(false);
  const [isOverrideTimeOpen, setIsOverrideTimeOpen] = useState(false);

  const csvData = [
    ["Postion", "Race Number", "Time"],
    ...places.map(({raceNumber, timeInSeconds}, i) => [i+1, raceNumber, formatTimerFromSeconds(timeInSeconds)])
  ]

  return (
  <div className="flex flex-col gap-4 items-center w-full">
    <div className="flex flex-col gap-0">
      {places.map(({raceNumber, timeInSeconds}, i) =>
      <div className="grid grid-cols-3 gap-2" key={`parent-${raceNumber}`}>
        <div className='text-l text-neutral-500 font-mono'>
          {i+1}.
        </div>
        <div className='text-l font-mono'>
          {raceNumber}
        </div>
        <div className='text-l font-mono'>
          {formatTimerFromSeconds(timeInSeconds)}
        </div>
      </div>
      )}
    </div>

    {(!isOverrideRaceNumberOpen && !isOverrideTimeOpen) &&
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
  
            {/* Edit a race number*/}
            <button 
              className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
              onClick={() => setIsOverrideRaceNumberOpen(true)}
            >
              <PencilSquareIcon className="size-4 text-white" />
            </button>
  
            {/* Edit a time*/}
            <button 
              className="w-10 h-10 rounded-md justify-items-center hover:bg-neutral-800"
              onClick={() => setIsOverrideTimeOpen(true)}
            >
              <ClockIcon className="size-4 text-white" />
            </button>
          </>
        }
      </div>
    }

    {isOverrideRaceNumberOpen &&
      <OverrideNumber places={places} setPlaces={setPlaces} settings={settings} setIsOverrideOpen={setIsOverrideRaceNumberOpen}/>
    }

    {isOverrideTimeOpen &&
      <OverrideTime places={places} setPlaces={setPlaces} setIsOverrideOpen={setIsOverrideTimeOpen}/>
    }
  </div>
  );
};

export default Results;
