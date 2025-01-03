"use client"

import React, { useEffect, useState }  from 'react';
import { intervalToDuration, startOfToday } from "date-fns";
import { CSVLink } from "react-csv";
import { formatClock, formatTimer, isRaceFieldValid, place } from './utils';

const DEFAULT_TIME = "00:00:00"
const DEFAULT_ELAPSED_TIME = "00:00"

export default function Timer() {
  // States
  const [clock, setClock] = useState(DEFAULT_TIME);
  const [elapsedTime, setElapsedTime] = useState(DEFAULT_ELAPSED_TIME);
  const [startTime, setStartTime] = useState<number>(global?.window?.localStorage?.startTime ? Number(localStorage.startTime) : 0);
  const [places, setPlaces] = useState<place[]>(global?.window?.localStorage?.places ? JSON.parse(localStorage.places) : [])

  // Get executed at the specified interval. Compute and set the time values.
  useEffect(() => {
    const timer = setInterval(() => {
      // Set the clock time
      const timeToNow = intervalToDuration({start: startOfToday(), end: Date.now()});
      setClock(formatClock(timeToNow.hours, timeToNow.minutes, timeToNow.seconds));
    
      // Compute and set the elasped time
      if (startTime > 0) {
        const stopwatch = intervalToDuration({start: Number(startTime), end: Date.now()});
        setElapsedTime(formatTimer(stopwatch.hours, stopwatch.minutes, stopwatch.seconds));
      }
    }, 100);
    return () => {
      clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
    }
  }, [startTime]);
  
  // To start the stopwatch.
  const start = () => {
    const now = Date.now();
    localStorage.startTime = now.toString();
    setStartTime(now);
  }

  // To reset the stopwatch.
  const reset = () => {
    if (confirm("Clear all results and reset timer?")) {
      localStorage.removeItem("startTime");
      setStartTime(0);
      setElapsedTime(DEFAULT_ELAPSED_TIME);
      localStorage.removeItem("places");
      setPlaces([]);
    }
  }

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
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">

        {/* Clock and Timer */}
        <div className="flex flex-col gap-2 items-center">
          <div className='text-xl text-neutral-500 font-mono'>
            {clock}
          </div>
          <div className='text-3xl font-mono'>
            {elapsedTime}
          </div>
        </div>
        
        <div className="flex flex-col gap-4 items-center">
          {/* Start and Reset buttons */}
          <div className="flex flex-row gap-2">
            <button className="bg-green-600 disabled:bg-gray-400 hover:bg-green-700 text-white py-2 px-4 rounded-md" onClick={() => start()} disabled={startTime !== 0}>
              Start
            </button>
            <button className="bg-red-500 disabled:bg-gray-400 hover:bg-red-600 text-white py-2 px-4 rounded-md" onClick={() => reset()} disabled={startTime === 0}>
              Reset
            </button>
          </div>

          {/* Recording of race numbers and times */}
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
              disabled={startTime === 0} 
              onClick={() => saveRaceNumber()}
            > 
              Record
            </button>
          </div>
        </div>

        {/* Display of position, race numbers and times */}
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
  
          {/* Downloading of the results */}
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

      </main>
      <footer className="text-neutral-500 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Source code available in GitHub
      </footer>
    </div>
  );
}
