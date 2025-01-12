import React, { SetStateAction, useState } from 'react';
import { place } from '../utils';
import { CSVLink } from 'react-csv';
import { PencilSquareIcon } from '@heroicons/react/16/solid';
import Notes from './Notes';
import { format } from 'date-fns';

interface ResultsProps {
  places: place[],
  notes: string,
  setNotes: React.Dispatch<SetStateAction<string>>
}

const Results: React.FC<ResultsProps> = ({ places, notes, setNotes }) => {
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const csvData = [
    ["Postion", "Race Number", "Time", "Notes"],
    ...places.map(({position, raceNumber, time}, key) => key === 0 ? [position, raceNumber, time, notes] : [position, raceNumber, time])
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

    {!isNotesOpen ?
    <div className="flex flex-col gap-4">
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
            onClick={() => setIsNotesOpen(true)}
            >
              <PencilSquareIcon className="size-4 text-white" />
            </button>
          </>
        }
      </div>
      <div className='text-l text-neutral-500 text-wrap'>
        {notes}
      </div>
    </div>
    :
    <Notes setIsNotesOpen={setIsNotesOpen} notes={notes} setNotes={setNotes}/>
    }
  </div>
  );
};

export default Results;
