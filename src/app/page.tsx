"use client"

import React, { useEffect, useState }  from 'react';
import { intervalToDuration, startOfToday } from "date-fns";
import { useLocalStorage } from 'usehooks-ts';
import Footer from './components/Footer';
import ClockAndTimer from './components/ClockAndTimer';
import Record from './components/Record';
import Results from './components/Results';
import Start from './components/Start';
import { DEFAULT_ELAPSED_TIME, DEFAULT_TIME, PLACES_DEFAULT, STARTTIME_DEFAULT } from './constants';
import { formatClock, formatTimer, place } from './utils';
import Settings from './components/Settings';

const Timer: React.FC = () => {
  // States
  const [clock, setClock] = useState(DEFAULT_TIME);
  const [elapsedTime, setElapsedTime] = useState(DEFAULT_ELAPSED_TIME);
  const [isSettingsOpen, setIsSettingsOpen]  =useState(false);

  // Values using local storage
  const [startTime, setStartTime] = useLocalStorage('startTime', STARTTIME_DEFAULT, { initializeWithValue: false });
  const [places, setPlaces] = useLocalStorage<place[]>('places', PLACES_DEFAULT, { initializeWithValue: false });

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

  
  return (
    <div className="grid grid-rows-[20px_1fr_24px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center w-full">

        <ClockAndTimer elapsedTime={elapsedTime} clock={clock} />
        {isSettingsOpen ?
        <Settings setStartTime={setStartTime} setElapsedTime={setElapsedTime} setPlaces={setPlaces} setIsSettingsOpen={setIsSettingsOpen}/>
        :
        <>
        <div className="flex flex-col gap-4 items-center w-full justify-items-center">
          {startTime === 0 ?
          <Start setStartTime={setStartTime} setIsSettingsOpen={setIsSettingsOpen} />
          :
          <Record elapsedTime={elapsedTime} places={places} setPlaces={setPlaces} setIsSettingsOpen={setIsSettingsOpen} />
          }
        </div>
        <Results places={places} />
        </>
        }
      </main>
      <Footer />
    </div>
  );
}

export default Timer;
