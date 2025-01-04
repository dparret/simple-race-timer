import React from 'react';
import { place } from '../utils';
import { CSVLink } from 'react-csv';

interface ResultsProps {
    places: place[],
}

const Results: React.FC<ResultsProps> = ({ places }) => 
  <div className="flex flex-col gap-8 items-center">
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

    {places.length > 0 &&
      <CSVLink className="bg-blue-500 disabled:bg-gray-400 hover:bg-blue-600 text-white py-2 px-4 rounded-md" filename="race_results.csv" data={
        [
          ["Postion", "Race Number", "Time"],
          ...places.map(({position, raceNumber, time}) => [position, raceNumber, time])
        ]
      }> 
        Download Results
      </CSVLink>
    }
  </div>

export default Results;