"use client"

import React, { useEffect, useState }  from 'react';
import { intervalToDuration, startOfToday } from "date-fns";
import { useLocalStorage } from 'usehooks-ts';
import Footer from './components/Footer';
import ClockAndTimer from './components/ClockAndTimer';
import Record from './components/Record';
import Results from './components/Results';
import Start from './components/Start';
import { formatClock, formatTimer, place } from './utils';

const DEFAULT_TIME = "00:00:00"
export const DEFAULT_ELAPSED_TIME = "00:00"
export const STARTTIME_DEFAULT = 0
export const PLACES_DEFAULT: place[] = []

const Timer: React.FC = () => {
  // States
  const [clock, setClock] = useState(DEFAULT_TIME);
  const [elapsedTime, setElapsedTime] = useState(DEFAULT_ELAPSED_TIME);

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
      <main className="flex flex-col gap-8 row-start-2 items-center">

        <ClockAndTimer elapsedTime={elapsedTime} clock={clock} />
        
        <div className="flex flex-col gap-4 items-center">
          <Start setStartTime={setStartTime} setElapsedTime={setElapsedTime} setPlaces={setPlaces} />
          <Record elapsedTime={elapsedTime} places={places} setPlaces={setPlaces} />
        </div>

        <Results places={places} />
      </main>
      <Footer />
    </div>
  );
}

export default Timer;
